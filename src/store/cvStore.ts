import { create } from 'zustand';
import { CV, CVSection, SectionType } from '@/types/cv';
import { DEFAULT_CV } from '@/utils/templates';

interface CVStore {
  // State
  currentCV: CV | null;
  isLoading: boolean;
  isSaving: boolean;
  lastSaved: Date | null;
  saveError: string | null;

  // CV Management
  setCurrentCV: (cv: CV) => void;
  updateCVTitle: (title: string) => void;
  updateCVTemplate: (template: string) => void;
  loadCV: (cvId: string) => Promise<void>;
  saveCV: () => Promise<void>;
  saveToLocalStorage: () => void;
  loadFromLocalStorage: () => CV | null;
  clearLocalStorage: () => void;

  // Section Management
  addSection: (section: CVSection) => void;
  removeSection: (sectionId: string) => void;
  updateSection: (sectionId: string, updates: Partial<CVSection>) => void;
  reorderSections: (sections: CVSection[]) => void;
  toggleSectionVisibility: (sectionId: string) => void;

  // Content Management
  updateSectionContent: (sectionId: string, content: any) => void;

  // Metadata
  updateMetadata: (metadata: Partial<CV['metadata']>) => void;

  // Save State
  markAsSaving: () => void;
  markAsSaved: () => void;
  setSaveError: (error: string | null) => void;
}

export const useCVStore = create<CVStore>((set, get) => ({
  // Initial state
  currentCV: null,
  isLoading: false,
  isSaving: false,
  lastSaved: null,
  saveError: null,

  // CV Management
  setCurrentCV: (cv: CV) => {
    set({ currentCV: cv });
    // Save to localStorage immediately
    try {
      localStorage.setItem('cv-draft', JSON.stringify(cv));
      localStorage.setItem('cv-draft-timestamp', new Date().toISOString());
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  },

  saveToLocalStorage: () => {
    const { currentCV } = get();
    if (!currentCV) return;
    try {
      localStorage.setItem('cv-draft', JSON.stringify(currentCV));
      localStorage.setItem('cv-draft-timestamp', new Date().toISOString());
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  },

  loadFromLocalStorage: () => {
    try {
      const draft = localStorage.getItem('cv-draft');
      if (draft) {
        return JSON.parse(draft) as CV;
      }
    } catch (error) {
      console.error('Failed to load from localStorage:', error);
    }
    return null;
  },

  clearLocalStorage: () => {
    try {
      localStorage.removeItem('cv-draft');
      localStorage.removeItem('cv-draft-timestamp');
    } catch (error) {
      console.error('Failed to clear localStorage:', error);
    }
  },

  loadCV: async (cvId: string) => {
    try {
      set({ isLoading: true });
      
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token');
      }

      const response = await fetch('/api/cv', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const result = await response.json();
      
      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to load CV');
      }

      // Find the specific CV
      const cv = result.data.cvs.find((c: CV) => c.id === cvId);
      if (cv) {
        set({ currentCV: cv, isLoading: false });
        // Save to localStorage as backup
        try {
          localStorage.setItem('cv-draft', JSON.stringify(cv));
          localStorage.setItem('cv-draft-timestamp', new Date().toISOString());
        } catch (error) {
          console.error('Failed to save to localStorage:', error);
        }
      } else {
        throw new Error('CV not found');
      }
    } catch (error) {
      console.error('Failed to load CV:', error);
      set({ isLoading: false });
    }
  },

  saveCV: async () => {
    const { currentCV } = get();
    if (!currentCV) return;

    try {
      set({ isSaving: true, saveError: null });
      
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token');
      }

      const response = await fetch('/api/cv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: currentCV.id.startsWith('temp-') ? undefined : currentCV.id,
          title: currentCV.title,
          template: currentCV.template,
          sections: currentCV.sections.map(section => ({
            type: section.type,
            title: section.title,
            content: section.content,
            order: section.order,
            visible: section.visible,
          })),
        }),
      });

      const result = await response.json();
      
      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to save CV');
      }

      // Update CV ID if it was temporary
      if (currentCV.id.startsWith('temp-')) {
        const updatedCV = { ...result.data.cv, atsScore: currentCV.atsScore };
        set({ currentCV: updatedCV });
        // Update localStorage with new ID
        try {
          localStorage.setItem('cv-draft', JSON.stringify(updatedCV));
          localStorage.setItem('cv-draft-timestamp', new Date().toISOString());
        } catch (error) {
          console.error('Failed to update localStorage:', error);
        }
      }

      set({ isSaving: false, lastSaved: new Date(), saveError: null });
    } catch (error) {
      console.error('Failed to save CV:', error);
      set({ 
        isSaving: false, 
        saveError: error instanceof Error ? error.message : 'Failed to save CV' 
      });
    }
  },

  updateCVTitle: (title: string) => {
    const { currentCV, saveToLocalStorage } = get();
    if (!currentCV) return;
    set({ currentCV: { ...currentCV, title } });
    saveToLocalStorage();
  },

  updateCVTemplate: (template: string) => {
    const { currentCV, saveToLocalStorage } = get();
    if (!currentCV) return;
    set({ currentCV: { ...currentCV, template } });
    saveToLocalStorage();
  },

  // Section Management
  addSection: (section: CVSection) => {
    const { currentCV, saveToLocalStorage } = get();
    if (!currentCV) return;

    const newSections = [...currentCV.sections, section];
    set({
      currentCV: {
        ...currentCV,
        sections: newSections,
      },
    });
    saveToLocalStorage();
  },

  removeSection: (sectionId: string) => {
    const { currentCV, saveToLocalStorage } = get();
    if (!currentCV) return;

    const newSections = currentCV.sections.filter(s => s.id !== sectionId);
    set({
      currentCV: {
        ...currentCV,
        sections: newSections,
      },
    });
    saveToLocalStorage();
  },

  updateSection: (sectionId: string, updates: Partial<CVSection>) => {
    const { currentCV, saveToLocalStorage } = get();
    if (!currentCV) return;

    const newSections = currentCV.sections.map(s =>
      s.id === sectionId ? { ...s, ...updates } : s
    );

    set({
      currentCV: {
        ...currentCV,
        sections: newSections,
      },
    });
    saveToLocalStorage();
  },

  reorderSections: (sections: CVSection[]) => {
    const { currentCV, saveToLocalStorage } = get();
    if (!currentCV) return;

    set({
      currentCV: {
        ...currentCV,
        sections: sections.map((s, index) => ({ ...s, order: index + 1 })),
      },
    });
    saveToLocalStorage();
  },

  toggleSectionVisibility: (sectionId: string) => {
    const { currentCV, saveToLocalStorage } = get();
    if (!currentCV) return;

    const newSections = currentCV.sections.map(s =>
      s.id === sectionId ? { ...s, visible: !s.visible } : s
    );

    set({
      currentCV: {
        ...currentCV,
        sections: newSections,
      },
    });
    saveToLocalStorage();
  },

  // Content Management
  updateSectionContent: (sectionId: string, content: any) => {
    const { currentCV, saveToLocalStorage } = get();
    if (!currentCV) return;

    const newSections = currentCV.sections.map(s =>
      s.id === sectionId ? { ...s, content } : s
    );

    set({
      currentCV: {
        ...currentCV,
        sections: newSections,
      },
    });
    saveToLocalStorage();
  },

  // Metadata
  updateMetadata: (metadata: Partial<CV['metadata']>) => {
    const { currentCV, saveToLocalStorage } = get();
    if (!currentCV) return;

    set({
      currentCV: {
        ...currentCV,
        metadata: {
          ...currentCV.metadata,
          ...metadata,
        },
      },
    });
    saveToLocalStorage();
  },

  // Save State
  markAsSaving: () => set({ isSaving: true }),
  markAsSaved: () =>
    set({ isSaving: false, lastSaved: new Date() }),
  setSaveError: (error: string | null) => set({ saveError: error }),
}));
