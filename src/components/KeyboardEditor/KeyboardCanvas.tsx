import React from "react";
import { useKeyboardStore } from "../../stores/keyboardStore";
import KeyComponent from "./KeyComponent";

const KeyboardCanvas: React.FC = () => {
    const { currentLayout } = useKeyboardStore();

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
                className="relative bg-gray-900 rounded-lg border border-gray-700 p-4"
                style={{
                    width: `${maxX * 50 + 50}px`,
                    height: `${maxY * 50 + 50}px`,
                }}
            >
                {currentLayout.keys.map((keyDef) => (
                    <KeyComponent key={keyDef.id} keyDef={keyDef} />
                ))}
            </div>

            <div className="mt-4 text-sm text-gray-400">
                キー数: {currentLayout.metadata.keyCount} | タイプ:{" "}
                {currentLayout.metadata.layoutType} | 地域: {currentLayout.metadata.region}
            </div>
        </div>
    );
};

export default KeyboardCanvas;
