import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { CV } from '@/types/cv';

export class PDFGenerator {
  /**
   * Generate PDF from HTML element - exact duplicate of preview
   */
  static async generatePDFFromHTML(
    elementId: string,
    filename: string = 'cv.pdf'
  ): Promise<void> {
    try {
      // Target the visible preview pages
      const pagesContainer = document.querySelector('.cv-pages');
      if (!pagesContainer) {
        throw new Error('Preview pages container not found');
      }

      const pages = Array.from(pagesContainer.querySelectorAll('.cv-page'));
      if (pages.length === 0) {
        throw new Error('No preview pages found');
      }

      // Create PDF with A4 settings
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      // Process each visible A4 page
      for (let pageIndex = 0; pageIndex < pages.length; pageIndex++) {
        const pageElement = pages[pageIndex] as HTMLElement;

        // Clone and prepare the page for rendering to ensure clean capture
        const clonedPage = pageElement.cloneNode(true) as HTMLElement;
        
        // Temporarily add to DOM for accurate rendering
        const tempContainer = document.createElement('div');
        tempContainer.style.position = 'fixed';
        tempContainer.style.left = '-10000px';
        tempContainer.style.top = '-10000px';
        tempContainer.style.width = pageElement.offsetWidth + 'px';
        tempContainer.style.height = pageElement.offsetHeight + 'px';
        tempContainer.appendChild(clonedPage);
        document.body.appendChild(tempContainer);

        // Capture the entire page element with improved text rendering
        const canvas = await html2canvas(clonedPage, {
          scale: 3, // Increased scale for better text clarity
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff',
          allowTaint: false,
          letterRendering: true, // Improved text rendering
          width: pageElement.offsetWidth,
          height: pageElement.offsetHeight,
          windowWidth: pageElement.scrollWidth,
          windowHeight: pageElement.scrollHeight,
          onclone: (clonedDocument) => {
            // Ensure fonts are properly applied in cloned document
            const style = clonedDocument.createElement('style');
            style.textContent = `
              * {
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
                text-rendering: geometricPrecision;
              }
            `;
            clonedDocument.head.appendChild(style);
          },
        });

        // Remove temporary container
        document.body.removeChild(tempContainer);

        const imgData = canvas.toDataURL('image/png', 0.95); // High quality PNG

        // Add image to PDF at full page size (A4: 210x297mm)
        pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);

        // Extract links from content and add as annotations
        const pageContent = pageElement.querySelector('.cv-page-content') as HTMLElement;
        if (pageContent) {
          const links = pageContent.querySelectorAll('a[href]');
          links.forEach((link) => {
            let href = link.getAttribute('href');
            if (!href) return;

            // Ensure URL has proper protocol
            if (!href.startsWith('http://') && !href.startsWith('https://') && !href.startsWith('mailto:')) {
              href = `https://${href}`;
            }

            const rect = link.getBoundingClientRect();
            const pageRect = pageElement.getBoundingClientRect();

            if (rect.width === 0 || rect.height === 0) return;

            // Calculate position relative to page in mm (A4 = 210x297mm)
            const relX = (rect.left - pageRect.left) / pageRect.width;
            const relY = (rect.top - pageRect.top) / pageRect.height;
            const relW = rect.width / pageRect.width;
            const relH = rect.height / pageRect.height;

            const x = relX * 210;
            const y = relY * 297;
            const w = Math.max(relW * 210, 0.5);
            const h = Math.max(relH * 297, 0.5);

            pdf.link(x, y, w, h, { url: href });
          });
        }

        // Add new page if not the last page
        if (pageIndex < pages.length - 1) {
          pdf.addPage();
        }
      }

      pdf.save(filename);
    } catch (error) {
      console.error('Error generating PDF:', error);
      throw error;
    }
  }

  /**
   * Generate PDF with custom styling
   */
  static async generateStyledPDF(
    htmlContent: string,
    filename: string = 'cv.pdf',
    options: {
      margins?: number;
      pageFormat?: 'a4' | 'letter';
    } = {}
  ): Promise<Blob> {
    const { margins = 25.4, pageFormat = 'a4' } = options;

    return new Promise((resolve, reject) => {
      const element = document.createElement('div');
      element.innerHTML = htmlContent;
      document.body.appendChild(element);

      html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      })
        .then(canvas => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: pageFormat,
          });

          const pageWidth = pdf.internal.pageSize.getWidth();
          const pageHeight = pdf.internal.pageSize.getHeight();
          const imgWidth = pageWidth - margins * 2;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;

          let heightLeft = imgHeight;
          let position = margins;

          pdf.addImage(imgData, 'PNG', margins, position, imgWidth, imgHeight);
          heightLeft -= pageHeight - margins * 2;

          while (heightLeft > 0) {
            position = heightLeft - imgHeight + margins;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', margins, position, imgWidth, imgHeight);
            heightLeft -= pageHeight - margins * 2;
          }

          pdf.save(filename);
          document.body.removeChild(element);
          resolve(pdf.output('blob'));
        })
        .catch(error => {
          document.body.removeChild(element);
          reject(error);
        });
    });
  }

  /**
   * Export CV as text
   */
  static exportAsText(cv: CV): string {
    let text = '';

    cv.sections
      .filter(s => s.visible)
      .sort((a, b) => a.order - b.order)
      .forEach(section => {
        text += `\n${'='.repeat(50)}\n`;
        text += `${section.title.toUpperCase()}\n`;
        text += `${'='.repeat(50)}\n\n`;

        if (Array.isArray(section.content)) {
          section.content.forEach((item: any) => {
            text += this.formatItem(item);
            text += '\n';
          });
        } else if (typeof section.content === 'object') {
          text += this.formatObject(section.content);
        } else {
          text += section.content;
        }
      });

    return text;
  }

  /**
   * Export CV as JSON
   */
  static exportAsJSON(cv: CV): string {
    return JSON.stringify(cv, null, 2);
  }

  private static formatItem(item: any): string {
    let result = '';

    if (item.title || item.jobTitle || item.name) {
      result += `• ${item.title || item.jobTitle || item.name}\n`;
    }
    if (item.company || item.school || item.issuer) {
      result += `  ${item.company || item.school || item.issuer}\n`;
    }
    if (item.startDate) {
      const endDate = item.endDate || (item.currentlyWorking ? 'Present' : 'Current');
      result += `  ${item.startDate} - ${endDate}\n`;
    }
    if (item.description || item.location) {
      result += `  ${item.description || item.location}\n`;
    }

    return result;
  }

  private static formatObject(obj: any): string {
    return Object.entries(obj)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n');
  }
}

// Export individual functions for server-side use
export function exportAsJSON(cv: CV): string {
  return PDFGenerator.exportAsJSON(cv);
}

export function exportAsText(cv: CV): string {
  return PDFGenerator.exportAsText(cv);
}
