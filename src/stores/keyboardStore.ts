import { create } from 'zustand';
import type { KeyboardLayout, KeyDefinition } from '../types/keyboard';
import { jisFullLayout } from '../data/presets/jisFull';

type LayerType = 'normal' | 'shift' | 'fn' | 'altgr';

interface KeyboardState {
    currentLayout: KeyboardLayout | null;
    selectedKeyId: string | null;
    isEditing: boolean;
    currentLayer: LayerType;
    isDragging: boolean;
    draggedKeyId: string | null;

    // Actions
    setCurrentLayout: (layout: KeyboardLayout) => void;
    selectKey: (keyId: string | null) => void;
    setEditing: (editing: boolean) => void;
    setCurrentLayer: (layer: LayerType) => void;
    updateKeyLegend: (keyId: string, legendType: keyof KeyDefinition['legends'], value: string) => void;
    updateKeyPosition: (keyId: string, position: { x: number; y: number }) => void;
    updateKeySize: (keyId: string, size: { width: number; height: number }) => void;
    setDragging: (isDragging: boolean, keyId?: string) => void;
    duplicateKey: (keyId: string) => void;
    deleteKey: (keyId: string) => void;
}

export const useKeyboardStore = create<KeyboardState>((set) => ({
    currentLayout: jisFullLayout,
    selectedKeyId: null,
    isEditing: false,
    currentLayer: 'normal' as LayerType,
    isDragging: false,
    draggedKeyId: null,

    setCurrentLayout: (layout) => set({ currentLayout: layout }),

    selectKey: (keyId) => set({ selectedKeyId: keyId }),

    setEditing: (editing) => set({ isEditing: editing }),

    setCurrentLayer: (layer) => set({ currentLayer: layer }),

    updateKeyLegend: (keyId, legendType, value) => set((state) => {
        if (!state.currentLayout) return state;

        const updatedKeys = state.currentLayout.keys.map(key =>
            key.id === keyId
                ? { ...key, legends: { ...key.legends, [legendType]: value } }
                : key
        );

        const newLayout = {
            ...state.currentLayout,
            keys: updatedKeys,
            updatedAt: new Date().toISOString(),
        };

        return { currentLayout: newLayout };
    }),

    updateKeyPosition: (keyId, position) => set((state) => {
        if (!state.currentLayout) return state;

        const updatedKeys = state.currentLayout.keys.map(key =>
            key.id === keyId
                ? { ...key, position }
                : key
        );

        const newLayout = {
            ...state.currentLayout,
            keys: updatedKeys,
            updatedAt: new Date().toISOString(),
        };

        return { currentLayout: newLayout };
    }),

    updateKeySize: (keyId, size) => set((state) => {
        if (!state.currentLayout) return state;

        const updatedKeys = state.currentLayout.keys.map(key =>
            key.id === keyId
                ? { ...key, size }
                : key
        );

        const newLayout = {
            ...state.currentLayout,
            keys: updatedKeys,
            updatedAt: new Date().toISOString(),
        };

        return { currentLayout: newLayout };
    }),

    setDragging: (isDragging, keyId) => set({
        isDragging,
        draggedKeyId: keyId || null
    }),

    duplicateKey: (keyId) => set((state) => {
        if (!state.currentLayout) return state;

        const keyToDuplicate = state.currentLayout.keys.find(key => key.id === keyId);
        if (!keyToDuplicate) return state;

        const newKey: KeyDefinition = {
            ...keyToDuplicate,
            id: `${keyId}_copy_${Date.now()}`,
            position: {
                x: keyToDuplicate.position.x + 1,
                y: keyToDuplicate.position.y
            }
        };

        const newLayout = {
            ...state.currentLayout,
            keys: [...state.currentLayout.keys, newKey],
            updatedAt: new Date().toISOString(),
        };

        return { currentLayout: newLayout };
    }),

    deleteKey: (keyId) => set((state) => {
        if (!state.currentLayout) return state;

        const updatedKeys = state.currentLayout.keys.filter(key => key.id !== keyId);

        const newLayout = {
            ...state.currentLayout,
            keys: updatedKeys,
            metadata: {
                ...state.currentLayout.metadata,
                keyCount: updatedKeys.length,
            },
            updatedAt: new Date().toISOString(),
        };

        return {
            currentLayout: newLayout,
            selectedKeyId: state.selectedKeyId === keyId ? null : state.selectedKeyId,
        };
    }),
}));
