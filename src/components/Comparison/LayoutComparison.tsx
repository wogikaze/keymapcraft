import React, { useState } from "react";
import type { KeyboardLayout } from "../../types/keyboard";
import { jisFullLayout } from "../../data/presets/jisFull";
import { usLayout } from "../../data/presets/us";

interface LayoutComparisonProps {
    currentLayout: KeyboardLayout;
}

const LayoutComparison: React.FC<LayoutComparisonProps> = ({ currentLayout }) => {
    const [compareLayout, setCompareLayout] = useState<KeyboardLayout>(
        currentLayout.metadata.layoutType === "JIS" ? usLayout : jisFullLayout
    );

    const presets = [
        { id: "jis-full", name: "JIS配列", layout: jisFullLayout },
        { id: "us", name: "US配列", layout: usLayout },
    ];

    // 差分を計算
    const getDifferences = () => {
        const differences: Array<{
            keyId: string;
            current: string;
            compare: string;
            position: { x: number; y: number };
        }> = [];

        currentLayout.keys.forEach((currentKey) => {
            const compareKey = compareLayout.keys.find(
                (k) =>
                    k.position.x === currentKey.position.x && k.position.y === currentKey.position.y
            );

            if (compareKey) {
                if (
                    currentKey.legends.normal !== compareKey.legends.normal ||
                    currentKey.legends.shift !== compareKey.legends.shift
                ) {
                    differences.push({
                        keyId: currentKey.id,
                        current: `${currentKey.legends.normal}${
                            currentKey.legends.shift !== currentKey.legends.normal
                                ? ` / ${currentKey.legends.shift}`
                                : ""
                        }`,
                        compare: `${compareKey.legends.normal}${
                            compareKey.legends.shift !== compareKey.legends.normal
                                ? ` / ${compareKey.legends.shift}`
                                : ""
                        }`,
                        position: currentKey.position,
                    });
                }
            }
        });

        return differences;
    };

    const differences = getDifferences();

    return (
        <div>
            {/* 比較対象選択 */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">比較対象</label>
                <div className="flex gap-2">
                    {presets.map((preset) => (
                        <button
                            key={preset.id}
                            onClick={() => setCompareLayout(preset.layout)}
                            className={`
                px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200
                ${
                    compareLayout.id === preset.layout.id
                        ? "bg-blue-600 text-white"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }
              `}
                        >
                            {preset.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* 比較結果 */}
            <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                    <div className="text-gray-300">
                        <span className="text-white font-medium">{currentLayout.name}</span> vs{" "}
                        <span className="text-white font-medium">{compareLayout.name}</span>
                    </div>
                    <div className="text-blue-400 font-medium">{differences.length}個の違い</div>
                </div>

                {differences.length === 0 ? (
                    <div className="text-center py-4 text-gray-400">
                        レイアウトに違いはありません
                    </div>
                ) : (
                    <div className="max-h-64 overflow-y-auto space-y-2">
                        {differences.map((diff, index) => (
                            <div
                                key={index}
                                className="bg-gray-700/50 rounded-md p-3 border border-gray-600"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs text-gray-400">
                                        位置: ({diff.position.x}, {diff.position.y})
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 gap-3 text-sm">
                                    <div>
                                        <div className="text-green-400 font-medium mb-1">
                                            {currentLayout.name}
                                        </div>
                                        <div className="bg-green-900/20 border border-green-600/30 rounded px-2 py-1 text-green-200">
                                            {diff.current}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-red-400 font-medium mb-1">
                                            {compareLayout.name}
                                        </div>
                                        <div className="bg-red-900/20 border border-red-600/30 rounded px-2 py-1 text-red-200">
                                            {diff.compare}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="mt-4 p-3 bg-blue-900/20 border border-blue-600/30 rounded-md">
                <p className="text-sm text-blue-200">
                    💡 <strong>ヒント:</strong> 緑色が現在のレイアウト、赤色が比較対象です
                </p>
            </div>
        </div>
    );
};

export default LayoutComparison;
