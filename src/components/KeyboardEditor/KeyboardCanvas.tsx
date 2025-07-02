import React from "react";
import { useDrop } from "react-dnd";
import { useKeyboardStore } from "../../stores/keyboardStore";
import KeyComponent from "./KeyComponent";

const KeyboardCanvas: React.FC = () => {
    const { currentLayout, updateKeyPosition } = useKeyboardStore();

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

                    // 25pxグリッド（0.5u単位）にスナップ
                    const gridX = Math.round(relativeX / 25) * 0.5;
                    const gridY = Math.round(relativeY / 25) * 0.5;

                    updateKeyPosition(item.id, {
                        x: Math.max(0, gridX),
                        y: Math.max(0, gridY),
                    });
                }
            },
            collect: (monitor) => ({
                isOver: monitor.isOver(),
            }),
        }),
        [updateKeyPosition]
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
            >
                {/* グリッド表示（0.5u = 25px単位） */}
                <div
                    className="absolute inset-4 opacity-20 pointer-events-none"
                    style={{
                        backgroundImage: `
                            linear-gradient(to right, #374151 1px, transparent 1px),
                            linear-gradient(to bottom, #374151 1px, transparent 1px)
                        `,
                        backgroundSize: "25px 25px",
                    }}
                />

                {currentLayout.keys.map((keyDef) => (
                    <KeyComponent key={keyDef.id} keyDef={keyDef} />
                ))}

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
