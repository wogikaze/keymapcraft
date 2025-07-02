import React, { useRef } from "react";
import { useKeyboardStore } from "../../stores/keyboardStore";
import type { KeyboardLayout } from "../../types/keyboard";

const LayoutImporter: React.FC = () => {
    const { setCurrentLayout } = useKeyboardStore();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const json = e.target?.result as string;
                const layout: KeyboardLayout = JSON.parse(json);

                // 基本的なバリデーション
                if (!layout.id || !layout.name || !Array.isArray(layout.keys)) {
                    throw new Error("無効なレイアウトファイルです");
                }

                // タイムスタンプを更新
                const importedLayout: KeyboardLayout = {
                    ...layout,
                    id: `imported_${Date.now()}`,
                    updatedAt: new Date().toISOString(),
                };

                setCurrentLayout(importedLayout);

                // ファイル入力をリセット
                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }

                alert(`${layout.name} を読み込みました`);
            } catch (error) {
                console.error("Import error:", error);
                alert("ファイルの読み込みに失敗しました。正しいJSONファイルか確認してください。");
            }
        };

        reader.readAsText(file);
    };

    const handleImportClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div>
            <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleFileSelect}
                className="hidden"
            />

            <button
                onClick={handleImportClick}
                className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors duration-200 flex items-center justify-center gap-2"
            >
                📂 JSONファイルを読み込み
            </button>

            <div className="mt-4 p-3 bg-gray-700/50 rounded-md">
                <p className="text-xs text-gray-400">
                    💡 <strong>対応フォーマット:</strong> KeymapCraftのJSONエクスポート形式
                    <br />
                    以前にエクスポートしたレイアウトファイルを読み込めます
                </p>
            </div>
        </div>
    );
};

export default LayoutImporter;
