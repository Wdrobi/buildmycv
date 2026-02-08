import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { CV } from '@/types/cv';

export class PDFGenerator {
  /**
   * Generate PDF from HTML element
   */
  static async generatePDFFromHTML(
    elementId: string,
    filename: string = 'cv.pdf'
  ): Promise<void> {
    try {
      const element = document.getElementById(elementId);
      if (!element) {
        throw new Error('Element not found');
      }

      // Create canvas from HTML
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      // Create PDF from canvas
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth - 20;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 10;

      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight - 20;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight + 10;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight - 20;
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
    const { margins = 10, pageFormat = 'a4' } = options;

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
