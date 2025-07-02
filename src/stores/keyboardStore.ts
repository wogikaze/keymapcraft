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
    dragPreviewPosition: { x: number; y: number } | null;
    isDirectInputEnabled: boolean;

    // Resize state
    isResizing: boolean;
    resizingKeyId: string | null;
    resizeDirection: 'right' | 'bottom' | 'corner' | null;

    // Export modal state
    isExportModalOpen: boolean;
    exportSettings: {
        fileName: string;
        layoutName: string;
        layoutDescription: string;
    };

    // Actions
    setCurrentLayout: (layout: KeyboardLayout) => void;
    selectKey: (keyId: string | null) => void;
    setEditing: (editing: boolean) => void;
    setCurrentLayer: (layer: LayerType) => void;
    updateKeyLegend: (keyId: string, legendType: keyof KeyDefinition['legends'], value: string) => void;
    updateKeyPosition: (keyId: string, position: { x: number; y: number }) => void;
    updateKeySize: (keyId: string, size: { width: number; height: number }) => void;
    setDragging: (isDragging: boolean, keyId?: string) => void;
    setDragPreviewPosition: (position: { x: number; y: number } | null) => void;

    // Resize actions
    setResizing: (isResizing: boolean, keyId?: string, direction?: 'right' | 'bottom' | 'corner') => void;

    duplicateKey: (keyId: string) => void;
    deleteKey: (keyId: string) => void;
    setDirectInputEnabled: (enabled: boolean) => void;
    handleDirectInput: (key: string, shiftKey: boolean) => void;

    // Export modal actions
    openExportModal: () => void;
    closeExportModal: () => void;
    updateExportSettings: (settings: Partial<KeyboardState['exportSettings']>) => void;
}

export const useKeyboardStore = create<KeyboardState>((set, get) => ({
    currentLayout: jisFullLayout,
    selectedKeyId: null,
    isEditing: false,
    currentLayer: 'normal' as LayerType,
    isDragging: false,
    draggedKeyId: null,
    dragPreviewPosition: null,
    isDirectInputEnabled: true,

    // Resize state
    isResizing: false,
    resizingKeyId: null,
    resizeDirection: null,

    // Export modal state
    isExportModalOpen: false,
    exportSettings: {
        fileName: '',
        layoutName: '',
        layoutDescription: '',
    },

    setCurrentLayout: (layout) => set({ currentLayout: layout }),

    selectKey: (keyId) => set({ selectedKeyId: keyId }),

    setEditing: (editing) => set({ isEditing: editing }),

    setCurrentLayer: (layer) => set({ currentLayer: layer }),

    setDirectInputEnabled: (enabled) => set({ isDirectInputEnabled: enabled }),

    handleDirectInput: (key: string, shiftKey: boolean) => {
        const state = get();
        if (!state.selectedKeyId || !state.currentLayout || !state.isDirectInputEnabled) return;

        const legendType = shiftKey ? 'shift' : 'normal';

        // 印刷可能な文字のみ受け付ける
        if (key.length === 1 || ['Backspace', 'Delete', 'Space'].includes(key)) {
            const value = key === 'Space' ? ' ' : key === 'Backspace' || key === 'Delete' ? '' : key;

            const updatedKeys = state.currentLayout.keys.map(keyDef =>
                keyDef.id === state.selectedKeyId
                    ? { ...keyDef, legends: { ...keyDef.legends, [legendType]: value } }
                    : keyDef
            );

            const newLayout = {
                ...state.currentLayout,
                keys: updatedKeys,
                updatedAt: new Date().toISOString(),
            };

            set({ currentLayout: newLayout });
        }
    },

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
        draggedKeyId: keyId || null,
        dragPreviewPosition: null
    }),

    setDragPreviewPosition: (position) => set({ dragPreviewPosition: position }),

    setResizing: (isResizing, keyId, direction) => set({
        isResizing,
        resizingKeyId: keyId || null,
        resizeDirection: direction || null
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

    // Export modal actions
    openExportModal: () => set((state) => {
        const currentLayout = state.currentLayout;
        return {
            isExportModalOpen: true,
            exportSettings: {
                fileName: currentLayout?.name || 'keyboard-layout',
                layoutName: currentLayout?.name || '',
                layoutDescription: currentLayout?.description || '',
            }
        };
    }),

    closeExportModal: () => set({ isExportModalOpen: false }),

    updateExportSettings: (settings) => set((state) => ({
        exportSettings: { ...state.exportSettings, ...settings }
    })),
}));
