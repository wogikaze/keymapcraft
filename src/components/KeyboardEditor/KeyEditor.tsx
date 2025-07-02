import React from "react";
import { useKeyboardStore } from "../../stores/keyboardStore";

const KeyEditor: React.FC = () => {
    const { selectedKeyId, currentLayout, updateKeyLegend } = useKeyboardStore();

    if (!selectedKeyId || !currentLayout) {
        return (
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-2">キーエディタ</h3>
                <p className="text-gray-400">キーを選択して編集してください</p>
            </div>
        );
    }

    const selectedKey = currentLayout.keys.find((key) => key.id === selectedKeyId);
    if (!selectedKey) return null;

    const handleLegendChange = (legendType: "normal" | "shift", value: string) => {
        updateKeyLegend(selectedKeyId, legendType, value);
    };

    return (
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">キーエディタ</h3>

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

                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <span className="text-gray-300">位置:</span>
                        <span className="text-white ml-2">
                            x:{selectedKey.position.x}, y:{selectedKey.position.y}
                        </span>
                    </div>
                    <div>
                        <span className="text-gray-300">サイズ:</span>
                        <span className="text-white ml-2">
                            {selectedKey.size.width}u × {selectedKey.size.height}u
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KeyEditor;
