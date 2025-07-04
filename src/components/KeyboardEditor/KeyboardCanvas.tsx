import React, { useRef } from "react";
import { useDrop } from "react-dnd";
import { useKeyboardStore } from "../../stores/keyboardStore";
import KeyComponent from "./KeyComponent";
import type { KeyDefinition } from "../../types/keyboard";

const KeyboardCanvas: React.FC = () => {
    const {
        currentLayout,
        updateKeyPosition,
        moveSelectedKeys,
        clearSelection,
        selectedKeyIds,
        isDragging,
        draggedKeyId,
        dragPreviewPosition,
        setDragPreviewPosition,
        isRectangleSelecting,
        rectangleSelection,
        startRectangleSelection,
        updateRectangleSelection,
        endRectangleSelection,
    } = useKeyboardStore();

    const canvasRef = useRef<HTMLDivElement>(null);

    // ドロップターゲット
    const [{ isOver }, drop] = useDrop(
        () => ({
            accept: "key",
            drop: (
                item: {
                    id: string;
                    originalPosition: { x: number; y: number };
                    isMultipleSelection?: boolean;
                    selectedKeyIds?: string[];
                },
                monitor
            ) => {
                const offset = monitor.getClientOffset();
                const canvasElement = document.querySelector(".keyboard-canvas");

                if (offset && canvasElement && currentLayout) {
                    const canvasRect = canvasElement.getBoundingClientRect();
                    const relativeX = offset.x - canvasRect.left - 16; // padding-4 = 16px
                    const relativeY = offset.y - canvasRect.top - 16;

                    // 12.5pxグリッド（0.25u単位）にスナップ
                    const gridX = Math.round(relativeX / 12.5) * 0.25;
                    const gridY = Math.round(relativeY / 12.5) * 0.25;

                    const newX = Math.max(0, gridX);
                    const newY = Math.max(0, gridY);

                    if (item.isMultipleSelection && item.selectedKeyIds) {
                        // 複数選択の場合：相対移動
                        const deltaX = newX - item.originalPosition.x;
                        const deltaY = newY - item.originalPosition.y;
                        moveSelectedKeys(deltaX, deltaY);
                    } else {
                        // 単一選択の場合：従来通り
                        updateKeyPosition(item.id, { x: newX, y: newY });
                    }
                }

                // ドラッグ終了時にプレビューをクリア
                setDragPreviewPosition(null);
            },
            hover: (_item: { id: string }, monitor) => {
                const offset = monitor.getClientOffset();
                const canvasElement = document.querySelector(".keyboard-canvas");

                if (offset && canvasElement) {
                    const canvasRect = canvasElement.getBoundingClientRect();
                    const relativeX = offset.x - canvasRect.left - 16; // padding-4 = 16px
                    const relativeY = offset.y - canvasRect.top - 16;

                    // 12.5pxグリッド（0.25u単位）にスナップ
                    const gridX = Math.round(relativeX / 12.5) * 0.25;
                    const gridY = Math.round(relativeY / 12.5) * 0.25;

                    // プレビュー位置を更新
                    setDragPreviewPosition({
                        x: Math.max(0, gridX),
                        y: Math.max(0, gridY),
                    });
                }
            },
            collect: (monitor) => ({
                isOver: monitor.isOver(),
            }),
        }),
        [updateKeyPosition, setDragPreviewPosition]
    );

    if (!currentLayout) {
        return (
            <div className="flex items-center justify-center h-64 text-gray-400">
                キーボードレイアウトが読み込まれていません
            </div>
        );
    }

    // キーボード全体のサイズを計算
    const maxX = Math.max(...currentLayout.keys.map((key) => key.position.x + key.size.width));
    const maxY = Math.max(...currentLayout.keys.map((key) => key.position.y + key.size.height));

    // キャンバスクリック時の処理（空白部分クリックで選択解除）
    const handleCanvasClick = (e: React.MouseEvent) => {
        // キーがクリックされた場合は何もしない（イベントバブリングで到達）
        if ((e.target as HTMLElement).closest(".key-component")) {
            return;
        }
        // 空白部分のクリックなので選択解除
        clearSelection();
    };

    // 矩形選択の開始
    const handleMouseDown = (e: React.MouseEvent) => {
        // キーがクリックされた場合は矩形選択を開始しない
        if ((e.target as HTMLElement).closest(".key-component")) {
            return;
        }

        e.preventDefault();

        const rect = canvasRef.current?.getBoundingClientRect();
        if (!rect) return;

        const x = e.clientX - rect.left - 16; // padding-4 = 16px
        const y = e.clientY - rect.top - 16;

        startRectangleSelection(x, y);

        // グローバルマウスイベントを設定
        const handleGlobalMouseMove = (moveEvent: MouseEvent) => {
            if (!canvasRef.current) return;

            const rect = canvasRef.current.getBoundingClientRect();
            const moveX = moveEvent.clientX - rect.left - 16;
            const moveY = moveEvent.clientY - rect.top - 16;

            updateRectangleSelection(moveX, moveY);
        };

        const handleGlobalMouseUp = () => {
            endRectangleSelection();
            document.removeEventListener("mousemove", handleGlobalMouseMove);
            document.removeEventListener("mouseup", handleGlobalMouseUp);
        };

        document.addEventListener("mousemove", handleGlobalMouseMove);
        document.addEventListener("mouseup", handleGlobalMouseUp);
    };

    // --- 重なり検出 ---
    // 1u = 50px
    const getRect = (key: KeyDefinition) => ({
        left: key.position.x * 50,
        top: key.position.y * 50,
        right: (key.position.x + key.size.width) * 50,
        bottom: (key.position.y + key.size.height) * 50,
    });
    const overlappingKeyIds = new Set<string>();
    for (let i = 0; i < currentLayout.keys.length; i++) {
        const keyA = currentLayout.keys[i];
        const rectA = getRect(keyA);
        for (let j = i + 1; j < currentLayout.keys.length; j++) {
            const keyB = currentLayout.keys[j];
            const rectB = getRect(keyB);
            if (
                rectA.left < rectB.right &&
                rectA.right > rectB.left &&
                rectA.top < rectB.bottom &&
                rectA.bottom > rectB.top
            ) {
                overlappingKeyIds.add(keyA.id);
                overlappingKeyIds.add(keyB.id);
            }
        }
    }

    return (
        <div className="w-full p-8">
            <div className="mb-4">
                <h2 className="text-2xl font-bold text-white">{currentLayout.name}</h2>
                <p className="text-gray-400">{currentLayout.description}</p>
            </div>

            <div
                ref={(el) => {
                    drop(el);
                    canvasRef.current = el;
                }}
                className={`
                    keyboard-canvas relative rounded-lg border-2 p-4 transition-colors duration-200
                    ${isOver ? "border-blue-400/50 bg-blue-900/10" : "border-gray-700 bg-gray-900"}
                `}
                style={{
                    width: `${Math.max(maxX * 50 + 100, 800)}px`,
                    height: `${maxY * 50 + 100}px`,
                }}
                onClick={handleCanvasClick}
                onMouseDown={handleMouseDown}
            >
                {/* グリッド表示（0.25u = 12.5px単位） */}
                <div
                    className="absolute inset-4 opacity-20 pointer-events-none"
                    style={{
                        backgroundImage: `
                            linear-gradient(to right, #374151 1px, transparent 1px),
                            linear-gradient(to bottom, #374151 1px, transparent 1px)
                        `,
                        backgroundSize: "12.5px 12.5px",
                    }}
                />

                {currentLayout.keys.map((keyDef) => (
                    <KeyComponent
                        key={keyDef.id}
                        keyDef={keyDef}
                        isOverlapping={overlappingKeyIds.has(keyDef.id)}
                    />
                ))}

                {/* ドラッグプレビューキー */}
                {isDragging &&
                    draggedKeyId &&
                    dragPreviewPosition &&
                    currentLayout &&
                    (() => {
                        const draggedKey = currentLayout.keys.find(
                            (key) => key.id === draggedKeyId
                        );
                        if (!draggedKey) return null;

                        // 複数選択されている場合は、選択されたすべてのキーのプレビューを表示
                        const isMultiDrag =
                            selectedKeyIds.length > 1 && selectedKeyIds.includes(draggedKeyId);

                        if (isMultiDrag) {
                            // 複数選択時のプレビュー
                            const selectedKeys = currentLayout.keys.filter((key) =>
                                selectedKeyIds.includes(key.id)
                            );

                            const deltaX = dragPreviewPosition.x - draggedKey.position.x;
                            const deltaY = dragPreviewPosition.y - draggedKey.position.y;

                            return (
                                <>
                                    {selectedKeys.map((key) => (
                                        <div
                                            key={`preview-${key.id}`}
                                            className="absolute rounded-lg border-2 border-blue-400/70 bg-blue-900/30 
                                                   flex flex-col items-center justify-center p-1 text-sm font-medium 
                                                   select-none pointer-events-none z-20"
                                            style={{
                                                left: `${(key.position.x + deltaX) * 50}px`,
                                                top: `${(key.position.y + deltaY) * 50}px`,
                                                width: `${key.size.width * 50}px`,
                                                height: `${key.size.height * 50}px`,
                                                opacity: 0.7,
                                            }}
                                        >
                                            {/* Shift文字（上段） */}
                                            {key.legends.shift !== key.legends.normal && (
                                                <div className="text-xs text-gray-300 leading-none">
                                                    {key.legends.shift}
                                                </div>
                                            )}

                                            {/* 通常文字（下段） */}
                                            <div
                                                className={`text-blue-200 leading-none ${
                                                    key.legends.shift !== key.legends.normal
                                                        ? ""
                                                        : "text-center"
                                                }`}
                                            >
                                                {key.legends.normal}
                                            </div>
                                        </div>
                                    ))}
                                </>
                            );
                        } else {
                            // 単一選択時のプレビュー（従来通り）
                            return (
                                <div
                                    className="absolute rounded-lg border-2 border-blue-400/70 bg-blue-900/30 
                                           flex flex-col items-center justify-center p-1 text-sm font-medium 
                                           select-none pointer-events-none z-20"
                                    style={{
                                        left: `${dragPreviewPosition.x * 50}px`,
                                        top: `${dragPreviewPosition.y * 50}px`,
                                        width: `${draggedKey.size.width * 50}px`,
                                        height: `${draggedKey.size.height * 50}px`,
                                        opacity: 0.7,
                                    }}
                                >
                                    {/* Shift文字（上段） */}
                                    {draggedKey.legends.shift !== draggedKey.legends.normal && (
                                        <div className="text-xs text-gray-300 leading-none">
                                            {draggedKey.legends.shift}
                                        </div>
                                    )}

                                    {/* 通常文字（下段） */}
                                    <div
                                        className={`text-blue-200 leading-none ${
                                            draggedKey.legends.shift !== draggedKey.legends.normal
                                                ? ""
                                                : "text-center"
                                        }`}
                                    >
                                        {draggedKey.legends.normal}
                                    </div>
                                </div>
                            );
                        }
                    })()}

                {/* 矩形選択の表示 */}
                {isRectangleSelecting && rectangleSelection && (
                    <div
                        className="absolute border-2 border-blue-400 bg-blue-400/20 pointer-events-none z-30"
                        style={{
                            left: `${Math.min(
                                rectangleSelection.startX,
                                rectangleSelection.endX
                            )}px`,
                            top: `${Math.min(
                                rectangleSelection.startY,
                                rectangleSelection.endY
                            )}px`,
                            width: `${Math.abs(
                                rectangleSelection.endX - rectangleSelection.startX
                            )}px`,
                            height: `${Math.abs(
                                rectangleSelection.endY - rectangleSelection.startY
                            )}px`,
                        }}
                    />
                )}

                {/* ドロップヒント */}
                {isOver && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="bg-blue-600/20 border-2 border-blue-400/50 rounded-lg px-4 py-2">
                            <span className="text-blue-300 font-medium">キーをここにドロップ</span>
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-4 text-sm text-gray-400">
                キー数: {currentLayout.keys.length} | タイプ:{" "}
                {currentLayout.metadata.layoutType} | 地域: {currentLayout.metadata.region}
            </div>
        </div>
    );
};

export default KeyboardCanvas;
