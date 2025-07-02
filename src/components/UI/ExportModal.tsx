import React, { useState } from "react";
import { useKeyboardStore } from "../../stores/keyboardStore";
import { exportToJSON, exportToPNG, exportToURL } from "../../utils/exportUtils";

interface ExportModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose }) => {
    const { currentLayout, exportSettings, updateExportSettings, setCurrentLayout } =
        useKeyboardStore();

    const [fileName, setFileName] = useState(exportSettings.fileName);
    const [layoutName, setLayoutName] = useState(exportSettings.layoutName);
    const [layoutDescription, setLayoutDescription] = useState(exportSettings.layoutDescription);

    // モーダルが開かれた時に設定を同期
    React.useEffect(() => {
        if (isOpen) {
            setFileName(exportSettings.fileName);
            setLayoutName(exportSettings.layoutName);
            setLayoutDescription(exportSettings.layoutDescription);
        }
    }, [isOpen, exportSettings]);

    const handleExport = (type: "json" | "png" | "url") => {
        if (!currentLayout) return;

        // エクスポート前に現在のレイアウトを更新
        const updatedLayout = {
            ...currentLayout,
            name: layoutName,
            description: layoutDescription,
            updatedAt: new Date().toISOString(),
        };

        // 設定を保存
        updateExportSettings({
            fileName,
            layoutName,
            layoutDescription,
        });

        // レイアウトを更新
        setCurrentLayout(updatedLayout);

        // エクスポート実行
        switch (type) {
            case "json":
                exportToJSON(updatedLayout, fileName);
                break;
            case "png":
                exportToPNG(updatedLayout, fileName);
                break;
            case "url": {
                const shareURL = exportToURL(updatedLayout);
                navigator.clipboard
                    .writeText(shareURL)
                    .then(() => {
                        alert("共有URLをクリップボードにコピーしました！");
                    })
                    .catch(() => {
                        alert(`共有URL: ${shareURL}`);
                    });
                break;
            }
        }

        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-white">エクスポート設定</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        ✕
                    </button>
                </div>

                <div className="space-y-4">
                    {/* ファイル名 */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            ファイル名
                        </label>
                        <input
                            type="text"
                            value={fileName}
                            onChange={(e) => setFileName(e.target.value)}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="keyboard-layout"
                        />
                        <p className="text-xs text-gray-400 mt-1">
                            JSON・PNG形式で保存する際のファイル名
                        </p>
                    </div>

                    {/* レイアウト名 */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            レイアウト名
                        </label>
                        <input
                            type="text"
                            value={layoutName}
                            onChange={(e) => setLayoutName(e.target.value)}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="My Keyboard Layout"
                        />
                        <p className="text-xs text-gray-400 mt-1">
                            JSONファイル内およびアプリ内での表示名
                        </p>
                    </div>

                    {/* 説明 */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">説明</label>
                        <textarea
                            value={layoutDescription}
                            onChange={(e) => setLayoutDescription(e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                            placeholder="このキーボードレイアウトの説明を入力してください"
                        />
                        <p className="text-xs text-gray-400 mt-1">
                            レイアウトの詳細な説明（オプション）
                        </p>
                    </div>
                </div>

                {/* エクスポートボタン */}
                <div className="flex gap-2 mt-6">
                    <button
                        onClick={() => handleExport("json")}
                        className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md text-sm font-medium transition-colors duration-200"
                    >
                        💾 JSON
                    </button>
                    <button
                        onClick={() => handleExport("png")}
                        className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md text-sm font-medium transition-colors duration-200"
                    >
                        🖼️ PNG
                    </button>
                    <button
                        onClick={() => handleExport("url")}
                        className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors duration-200"
                    >
                        🔗 URL
                    </button>
                </div>

                {/* キャンセルボタン */}
                <button
                    onClick={onClose}
                    className="w-full mt-3 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-md text-sm font-medium transition-colors duration-200"
                >
                    キャンセル
                </button>
            </div>
        </div>
    );
};

export default ExportModal;
