import React from "react";
import { useKeyboardStore } from "../../stores/keyboardStore";
import { jisFullLayout } from "../../data/presets/jisFull";
import { jisCompactLayout } from "../../data/presets/jisCompact";
import { usLayout } from "../../data/presets/us";

const PresetSelector: React.FC = () => {
    const { currentLayout, setCurrentLayout } = useKeyboardStore();

    const presets = [
        {
            id: "jis-full",
            name: jisFullLayout.name,
            layout: jisFullLayout,
            description: jisFullLayout.description,
        },
        {
            id: "jis-compact",
            name: jisCompactLayout.name,
            layout: jisCompactLayout,
            description: jisCompactLayout.description,
        },
        {
            id: "us",
            name: usLayout.name,
            layout: usLayout,
            description: usLayout.description,
        },
    ];

    const handlePresetSelect = (layout: typeof jisFullLayout) => {
        const confirmed =
            currentLayout &&
            currentLayout.keys.some(
                (key) =>
                    key.legends.normal !== layout.keys.find((k) => k.id === key.id)?.legends.normal
            )
                ? confirm("現在の編集内容が失われますが、プリセットを読み込みますか？")
                : true;

        if (confirmed) {
            setCurrentLayout({
                ...layout,
                id: `${layout.id}_${Date.now()}`,
                updatedAt: new Date().toISOString(),
            });
        }
    };

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {presets.map((preset) => (
                    <button
                        key={preset.id}
                        onClick={() => handlePresetSelect(preset.layout)}
                        className={`
              p-3 rounded-lg border-2 text-left transition-all duration-200
              hover:border-blue-400 hover:bg-blue-900/20
              ${
                  currentLayout?.id === preset.layout.id
                      ? "border-blue-400 bg-blue-900/30"
                      : "border-gray-600 bg-gray-700/50"
              }
            `}
                    >
                        <div className="font-medium text-white mb-1">{preset.name}</div>
                        <div className="text-sm text-gray-400">{preset.description}</div>
                        <div className="text-xs text-gray-500 mt-1">
                            {preset.layout.metadata.keyCount}キー |{" "}
                            {preset.layout.metadata.layoutType}
                        </div>
                    </button>
                ))}
            </div>

            <div className="mt-4 p-3 bg-gray-700/50 rounded-md">
                <p className="text-xs text-gray-400">
                    💡 <strong>ヒント:</strong> プリセットを選択後、キーを自由に編集できます
                </p>
            </div>
        </div>
    );
};

export default PresetSelector;
