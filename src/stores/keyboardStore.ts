import { create } from 'zustand';
import type { KeyboardLayout } from '../types/keyboard';
import { usLayout } from '../data/presets/us';

interface KeyboardState {
    currentLayout: KeyboardLayout | null;
    selectedKeyId: string | null;
    isEditing: boolean;

    // Actions
    setCurrentLayout: (layout: KeyboardLayout) => void;
    selectKey: (keyId: string | null) => void;
    setEditing: (editing: boolean) => void;
    updateKeyLegend: (keyId: string, legendType: 'normal' | 'shift', value: string) => void;
}

export const useKeyboardStore = create<KeyboardState>((set) => ({
    currentLayout: usLayout,
    selectedKeyId: null,
    isEditing: false,

    setCurrentLayout: (layout) => set({ currentLayout: layout }),

    selectKey: (keyId) => set({ selectedKeyId: keyId }),

    setEditing: (editing) => set({ isEditing: editing }),

    updateKeyLegend: (keyId, legendType, value) => set((state) => {
        if (!state.currentLayout) return state;

        const updatedKeys = state.currentLayout.keys.map(key =>
            key.id === keyId
                ? { ...key, legends: { ...key.legends, [legendType]: value } }
                : key
        );

        return {
            currentLayout: {
                ...state.currentLayout,
                keys: updatedKeys,
                updatedAt: new Date()
            }
        };
    }),
}));
