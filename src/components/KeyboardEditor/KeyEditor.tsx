import React from "react";
import { useKeyboardStore } from "../../stores/keyboardStore";

const KeyEditor: React.FC = () => {
    const { selectedKeyId, currentLayout, updateKeyLegend, updateKeySize, updateKeyPosition } =
        useKeyboardStore();

    if (!selectedKeyId || !currentLayout) {
        return (
            <div>
                <p className="text-gray-400">キーを選択して編集してください</p>
            </div>
        );
    }

    const selectedKey = currentLayout.keys.find((key) => key.id === selectedKeyId);
    if (!selectedKey) return null;

    const handleLegendChange = (legendType: keyof typeof selectedKey.legends, value: string) => {
        updateKeyLegend(selectedKeyId, legendType, value);
    };

    return (
        <div>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">キーID</label>
                    <input
                        type="text"
                        value={selectedKey.id}
                        disabled
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white text-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                        キーコード
                    </label>
                    <input
                        type="text"
                        value={selectedKey.keycode}
                        disabled
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white text-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">通常入力</label>
                    <input
                        type="text"
                        value={selectedKey.legends.normal}
                        onChange={(e) => handleLegendChange("normal", e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                        Shift + キー
                    </label>
                    <input
                        type="text"
                        value={selectedKey.legends.shift}
                        onChange={(e) => handleLegendChange("shift", e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                {/* Fnレイヤー */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                        Fn + キー (オプション)
                    </label>
                    <input
                        type="text"
                        value={selectedKey.legends.fn || ""}
                        onChange={(e) => updateKeyLegend(selectedKeyId, "fn", e.target.value)}
                        placeholder="未設定（通常入力と同じ）"
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                {/* AltGrレイヤー */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                        AltGr + キー (オプション)
                    </label>
                    <input
                        type="text"
                        value={selectedKey.legends.altgr || ""}
                        onChange={(e) => updateKeyLegend(selectedKeyId, "altgr", e.target.value)}
                        placeholder="未設定（通常入力と同じ）"
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                {/* 位置調整 */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        位置 (X, Y)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                        <input
                            type="number"
                            step="0.5"
                            value={selectedKey.position.x}
                            onChange={(e) =>
                                updateKeyPosition(selectedKeyId, {
                                    ...selectedKey.position,
                                    x: Math.max(0, parseFloat(e.target.value) || 0),
                                })
                            }
                            className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            min="0"
                        />
                        <input
                            type="number"
                            step="0.5"
                            value={selectedKey.position.y}
                            onChange={(e) =>
                                updateKeyPosition(selectedKeyId, {
                                    ...selectedKey.position,
                                    y: Math.max(0, parseFloat(e.target.value) || 0),
                                })
                            }
                            className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            min="0"
                        />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                        座標: 0.5単位で細かく調整可能、ドラッグでも移動できます
                    </p>
                </div>

                {/* サイズ調整 */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        サイズ (幅, 高さ)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                        <input
                            type="number"
                            step="0.5"
                            value={selectedKey.size.width}
                            onChange={(e) =>
                                updateKeySize(selectedKeyId, {
                                    ...selectedKey.size,
                                    width: Math.max(0.5, parseFloat(e.target.value) || 1),
                                })
                            }
                            className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            min="0.5"
                        />
                        <input
                            type="number"
                            step="0.5"
                            value={selectedKey.size.height}
                            onChange={(e) =>
                                updateKeySize(selectedKeyId, {
                                    ...selectedKey.size,
                                    height: Math.max(0.5, parseFloat(e.target.value) || 1),
                                })
                            }
                            className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            min="0.5"
                        />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                        ユニット: 1u = 標準キーサイズ (50px), 0.5u単位で調整可能
                    </p>
                </div>
            </div>
        </div>
    );
};

export default KeyEditor;
