import React from "react";
import { useKeyboardStore } from "../../stores/keyboardStore";
import { exportToJSON, exportToPNG, exportToURL } from "../../utils/exportUtils";

const Toolbar: React.FC = () => {
    const {
        currentLayer,
        setCurrentLayer,
        selectedKeyId,
        duplicateKey,
        deleteKey,
        currentLayout,
        setCurrentLayout,
    } = useKeyboardStore();

    const layers = [
        { key: "normal" as const, label: "通常", color: "text-white" },
        { key: "shift" as const, label: "Shift", color: "text-yellow-400" },
        { key: "fn" as const, label: "Fn", color: "text-green-400" },
        { key: "altgr" as const, label: "AltGr", color: "text-purple-400" },
    ];

    const handleAddKey = () => {
        if (!currentLayout) return;

        const newKey = {
            id: `key_${Date.now()}`,
            position: { x: 0, y: 0 },
            size: { width: 1, height: 1 },
            keycode: "Custom",
            legends: {
                normal: "?",
                shift: "?",
            },
        };

        const updatedLayout = {
            ...currentLayout,
            keys: [...currentLayout.keys, newKey],
            metadata: {
                ...currentLayout.metadata,
                keyCount: currentLayout.keys.length + 1,
            },
            updatedAt: new Date().toISOString(),
        };

        setCurrentLayout(updatedLayout);
    };

    const handleResetLayout = () => {
        if (confirm("レイアウトをリセットしますか？すべての変更が失われます。")) {
            window.location.reload();
        }
    };

    return (
        <div>
            {/* レイヤー切り替え */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">表示レイヤー</label>
                <div className="flex gap-2 flex-wrap">
                    {layers.map((layer) => (
                        <button
                            key={layer.key}
                            onClick={() => setCurrentLayer(layer.key)}
                            className={`
                px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200
                ${
                    currentLayer === layer.key
                        ? "bg-blue-600 text-white"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }
              `}
                        >
                            <span className={layer.color}>{layer.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* キー操作 */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">キー操作</label>
                <div className="flex gap-2 flex-wrap">
                    <button
                        onClick={handleAddKey}
                        className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm font-medium transition-colors duration-200"
                    >
                        ➕ キー追加
                    </button>

                    {selectedKeyId && (
                        <>
                            <button
                                onClick={() => duplicateKey(selectedKeyId)}
                                className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors duration-200"
                            >
                                📋 複製
                            </button>

                            <button
                                onClick={() => deleteKey(selectedKeyId)}
                                className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium transition-colors duration-200"
                            >
                                🗑️ 削除
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* レイアウト操作 */}
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                    レイアウト操作
                </label>
                <div className="flex gap-2 flex-wrap">
                    <button
                        onClick={handleResetLayout}
                        className="px-3 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-md text-sm font-medium transition-colors duration-200"
                    >
                        🔄 リセット
                    </button>

                    {/* JSONエクスポート */}
                    <button
                        onClick={() => currentLayout && exportToJSON(currentLayout)}
                        className="px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md text-sm font-medium transition-colors duration-200"
                    >
                        💾 JSON
                    </button>

                    {/* 画像エクスポート */}
                    <button
                        onClick={() => currentLayout && exportToPNG(currentLayout)}
                        className="px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md text-sm font-medium transition-colors duration-200"
                    >
                        🖼️ PNG
                    </button>

                    {/* URL共有 */}
                    <button
                        onClick={() => {
                            if (currentLayout) {
                                const shareURL = exportToURL(currentLayout);
                                navigator.clipboard
                                    .writeText(shareURL)
                                    .then(() => {
                                        alert("共有URLをクリップボードにコピーしました！");
                                    })
                                    .catch(() => {
                                        alert(`共有URL: ${shareURL}`);
                                    });
                            }
                        }}
                        className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors duration-200"
                    >
                        � 共有
                    </button>
                </div>
            </div>

            {/* ヘルプ */}
            <div className="mt-4 p-3 bg-gray-700/50 rounded-md">
                <p className="text-xs text-gray-400">
                    💡 <strong>使い方:</strong> キーをドラッグして移動、クリックして選択・編集
                </p>
            </div>
        </div>
    );
};

export default Toolbar;
