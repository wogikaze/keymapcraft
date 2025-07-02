import React from "react";
import { useDrop } from "react-dnd";
import { useKeyboardStore } from "../../stores/keyboardStore";
import KeyComponent from "./KeyComponent";

const KeyboardCanvas: React.FC = () => {
    const {
        currentLayout,
        updateKeyPosition,
        selectKey,
        isDragging,
        draggedKeyId,
        dragPreviewPosition,
        setDragPreviewPosition,
    } = useKeyboardStore();

    // ドロップターゲット
    const [{ isOver }, drop] = useDrop(
        () => ({
            accept: "key",
            drop: (item: { id: string }, monitor) => {
                const offset = monitor.getClientOffset();
                const canvasElement = document.querySelector(".keyboard-canvas");

                if (offset && canvasElement) {
                    const canvasRect = canvasElement.getBoundingClientRect();
                    const relativeX = offset.x - canvasRect.left - 16; // padding-4 = 16px
                    const relativeY = offset.y - canvasRect.top - 16;

                    // 12.5pxグリッド（0.25u単位）にスナップ
                    const gridX = Math.round(relativeX / 12.5) * 0.25;
                    const gridY = Math.round(relativeY / 12.5) * 0.25;

                    updateKeyPosition(item.id, {
                        x: Math.max(0, gridX),
                        y: Math.max(0, gridY),
                    });
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
        selectKey(null);
    };

    return (
        <div className="w-full p-8">
            <div className="mb-4">
                <h2 className="text-2xl font-bold text-white">{currentLayout.name}</h2>
                <p className="text-gray-400">{currentLayout.description}</p>
            </div>

            <div
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ref={drop as any}
                className={`
                    keyboard-canvas relative rounded-lg border-2 p-4 transition-colors duration-200
                    ${isOver ? "border-blue-400/50 bg-blue-900/10" : "border-gray-700 bg-gray-900"}
                `}
                style={{
                    width: `${Math.max(maxX * 50 + 100, 800)}px`,
                    height: `${maxY * 50 + 100}px`,
                }}
                onClick={handleCanvasClick}
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
                    <KeyComponent key={keyDef.id} keyDef={keyDef} />
                ))}

                {/* ドラッグプレビューキー */}
                {isDragging &&
                    draggedKeyId &&
                    dragPreviewPosition &&
                    (() => {
                        const draggedKey = currentLayout.keys.find(
                            (key) => key.id === draggedKeyId
                        );
                        if (!draggedKey) return null;

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
                    })()}

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
                キー数: {currentLayout.metadata.keyCount} | タイプ:{" "}
                {currentLayout.metadata.layoutType} | 地域: {currentLayout.metadata.region}
            </div>
        </div>
    );
};

export default KeyboardCanvas;
