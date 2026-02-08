import { create } from 'zustand';
import { CV, CVSection, SectionType } from '@/types/cv';
import { DEFAULT_CV } from '@/utils/templates';

interface CVStore {
  // State
  currentCV: CV | null;
  isLoading: boolean;
  isSaving: boolean;
  lastSaved: Date | null;

  // CV Management
  setCurrentCV: (cv: CV) => void;
  updateCVTitle: (title: string) => void;
  updateCVTemplate: (template: string) => void;

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
}

export const useCVStore = create<CVStore>((set, get) => ({
  // Initial state
  currentCV: null,
  isLoading: false,
  isSaving: false,
  lastSaved: null,

  // CV Management
  setCurrentCV: (cv: CV) => set({ currentCV: cv }),

  updateCVTitle: (title: string) => {
    const { currentCV } = get();
    if (!currentCV) return;
    set({ currentCV: { ...currentCV, title } });
  },

  updateCVTemplate: (template: string) => {
    const { currentCV } = get();
    if (!currentCV) return;
    set({ currentCV: { ...currentCV, template } });
  },

  // Section Management
  addSection: (section: CVSection) => {
    const { currentCV } = get();
    if (!currentCV) return;

    const newSections = [...currentCV.sections, section];
    set({
      currentCV: {
        ...currentCV,
        sections: newSections,
      },
    });
  },

  removeSection: (sectionId: string) => {
    const { currentCV } = get();
    if (!currentCV) return;

    const newSections = currentCV.sections.filter(s => s.id !== sectionId);
    set({
      currentCV: {
        ...currentCV,
        sections: newSections,
      },
    });
  },

  updateSection: (sectionId: string, updates: Partial<CVSection>) => {
    const { currentCV } = get();
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
  },

  reorderSections: (sections: CVSection[]) => {
    const { currentCV } = get();
    if (!currentCV) return;

    set({
      currentCV: {
        ...currentCV,
        sections: sections.map((s, index) => ({ ...s, order: index + 1 })),
      },
    });
  },

  toggleSectionVisibility: (sectionId: string) => {
    const { currentCV } = get();
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
  },

  // Content Management
  updateSectionContent: (sectionId: string, content: any) => {
    const { currentCV } = get();
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
  },

  // Metadata
  updateMetadata: (metadata: Partial<CV['metadata']>) => {
    const { currentCV } = get();
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
  },

  // Save State
  markAsSaving: () => set({ isSaving: true }),
  markAsSaved: () =>
    set({ isSaving: false, lastSaved: new Date() }),
}));
