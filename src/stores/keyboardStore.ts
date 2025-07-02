import { create } from 'zustand';
import type { KeyboardLayout, KeyDefinition } from '../types/keyboard';
import { jisFullLayout } from '../data/presets/jisFull';

type LayerType = 'normal' | 'shift' | 'fn' | 'altgr';

interface KeyboardState {
    currentLayout: KeyboardLayout | null;
    selectedKeyId: string | null;
    selectedKeyIds: string[]; // 複数選択用
    isEditing: boolean;
    currentLayer: LayerType;
    isDragging: boolean;
    draggedKeyId: string | null;
    dragPreviewPosition: { x: number; y: number } | null;
    isDirectInputEnabled: boolean;

    // Rectangle selection state
    isRectangleSelecting: boolean;
    rectangleSelection: {
        startX: number;
        startY: number;
        endX: number;
        endY: number;
    } | null;

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
    selectMultipleKeys: (keyIds: string[]) => void;
    addToSelection: (keyId: string) => void;
    removeFromSelection: (keyId: string) => void;
    clearSelection: () => void;
    setEditing: (editing: boolean) => void;
    setCurrentLayer: (layer: LayerType) => void;
    updateKeyLegend: (keyId: string, legendType: keyof KeyDefinition['legends'], value: string) => void;
    updateKeyPosition: (keyId: string, position: { x: number; y: number }) => void;
    updateKeySize: (keyId: string, size: { width: number; height: number }) => void;
    setDragging: (isDragging: boolean, keyId?: string) => void;
    setDragPreviewPosition: (position: { x: number; y: number } | null) => void;

    // Rectangle selection actions
    startRectangleSelection: (x: number, y: number) => void;
    updateRectangleSelection: (x: number, y: number) => void;
    endRectangleSelection: () => void;

    // Resize actions
    setResizing: (isResizing: boolean, keyId?: string, direction?: 'right' | 'bottom' | 'corner') => void;

    duplicateKey: (keyId: string) => void;
    deleteKey: (keyId: string) => void;
    deleteSelectedKeys: () => void; // 複数削除
    duplicateSelectedKeys: () => void; // 複数複製
    moveSelectedKeys: (deltaX: number, deltaY: number) => void; // 複数移動
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
    selectedKeyIds: [],
    isEditing: false,
    currentLayer: 'normal' as LayerType,
    isDragging: false,
    draggedKeyId: null,
    dragPreviewPosition: null,
    isDirectInputEnabled: true,

    // Rectangle selection state
    isRectangleSelecting: false,
    rectangleSelection: null,

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

    selectKey: (keyId) => set({
        selectedKeyId: keyId,
        selectedKeyIds: keyId ? [keyId] : []
    }),

    selectMultipleKeys: (keyIds) => set({
        selectedKeyIds: keyIds,
        selectedKeyId: keyIds.length === 1 ? keyIds[0] : null
    }),

    addToSelection: (keyId) => set((state) => {
        const newSelection = [...state.selectedKeyIds];
        if (!newSelection.includes(keyId)) {
            newSelection.push(keyId);
        }
        return {
            selectedKeyIds: newSelection,
            selectedKeyId: newSelection.length === 1 ? newSelection[0] : null
        };
    }),

    removeFromSelection: (keyId) => set((state) => {
        const newSelection = state.selectedKeyIds.filter(id => id !== keyId);
        return {
            selectedKeyIds: newSelection,
            selectedKeyId: newSelection.length === 1 ? newSelection[0] : null
        };
    }),

    clearSelection: () => set({
        selectedKeyIds: [],
        selectedKeyId: null
    }),

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

    // Rectangle selection actions
    startRectangleSelection: (x, y) => set({
        isRectangleSelecting: true,
        rectangleSelection: {
            startX: x,
            startY: y,
            endX: x,
            endY: y,
        }
    }),

    updateRectangleSelection: (x, y) => set((state) => ({
        rectangleSelection: state.rectangleSelection ? {
            ...state.rectangleSelection,
            endX: x,
            endY: y,
        } : null
    })),

    endRectangleSelection: () => set((state) => {
        if (!state.rectangleSelection || !state.currentLayout) {
            return { isRectangleSelecting: false, rectangleSelection: null };
        }

        const { startX, startY, endX, endY } = state.rectangleSelection;
        const minX = Math.min(startX, endX);
        const maxX = Math.max(startX, endX);
        const minY = Math.min(startY, endY);
        const maxY = Math.max(startY, endY);

        // 矩形内のキーを選択
        const selectedKeys = state.currentLayout.keys.filter(key => {
            const keyLeft = key.position.x * 50; // 1u = 50px (表示サイズに合わせる)
            const keyTop = key.position.y * 50;
            const keyRight = keyLeft + (key.size.width * 50);
            const keyBottom = keyTop + (key.size.height * 50);

            return keyLeft < maxX && keyRight > minX && keyTop < maxY && keyBottom > minY;
        });

        const selectedKeyIds = selectedKeys.map(key => key.id);

        return {
            isRectangleSelecting: false,
            rectangleSelection: null,
            selectedKeyIds: selectedKeyIds,
            selectedKeyId: selectedKeyIds.length === 1 ? selectedKeyIds[0] : null
        };
    }),

    // Bulk operations
    deleteSelectedKeys: () => set((state) => {
        if (!state.currentLayout || state.selectedKeyIds.length === 0) return state;

        const updatedKeys = state.currentLayout.keys.filter(
            key => !state.selectedKeyIds.includes(key.id)
        );

        const newLayout = {
            ...state.currentLayout,
            keys: updatedKeys,
            updatedAt: new Date().toISOString(),
        };

        return {
            currentLayout: newLayout,
            selectedKeyIds: [],
            selectedKeyId: null,
        };
    }),

    duplicateSelectedKeys: () => set((state) => {
        if (!state.currentLayout || state.selectedKeyIds.length === 0) return state;

        const keysToDuplicate = state.currentLayout.keys.filter(
            key => state.selectedKeyIds.includes(key.id)
        );

        const duplicatedKeys = keysToDuplicate.map(key => ({
            ...key,
            id: `${key.id}-copy-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            position: {
                x: key.position.x + 1, // 1u右にオフセット
                y: key.position.y + 1, // 1u下にオフセット
            },
        }));

        const newLayout = {
            ...state.currentLayout,
            keys: [...state.currentLayout.keys, ...duplicatedKeys],
            updatedAt: new Date().toISOString(),
        };

        const newSelectedIds = duplicatedKeys.map(key => key.id);

        return {
            currentLayout: newLayout,
            selectedKeyIds: newSelectedIds,
            selectedKeyId: newSelectedIds.length === 1 ? newSelectedIds[0] : null,
        };
    }),

    moveSelectedKeys: (deltaX, deltaY) => set((state) => {
        if (!state.currentLayout || state.selectedKeyIds.length === 0) return state;

        const updatedKeys = state.currentLayout.keys.map(key =>
            state.selectedKeyIds.includes(key.id)
                ? {
                    ...key,
                    position: {
                        x: Math.max(0, key.position.x + deltaX),
                        y: Math.max(0, key.position.y + deltaY),
                    }
                }
                : key
        );

        const newLayout = {
            ...state.currentLayout,
            keys: updatedKeys,
            updatedAt: new Date().toISOString(),
        };

        return { currentLayout: newLayout };
    }),
}));
