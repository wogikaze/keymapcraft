import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import KeyboardCanvas from "./components/KeyboardEditor/KeyboardCanvas";
import KeyEditor from "./components/KeyboardEditor/KeyEditor";
import Toolbar from "./components/KeyboardEditor/Toolbar";
import PresetSelector from "./components/LayoutManager/PresetSelector";
import LayoutImporter from "./components/LayoutManager/LayoutImporter";
import LayoutComparison from "./components/Comparison/LayoutComparison";
import CollapsibleSection from "./components/UI/CollapsibleSection";
import { useKeyboardStore } from "./stores/keyboardStore";
import { importFromURL } from "./utils/exportUtils";
import { useEffect } from "react";

function App() {
    const { currentLayout, setCurrentLayout } = useKeyboardStore();

    // URL共有からのレイアウト読み込み
    useEffect(() => {
        const urlLayout = importFromURL();
        if (urlLayout) {
            setCurrentLayout(urlLayout);
            // URLから共有パラメータを削除
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }, [setCurrentLayout]);

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="min-h-screen bg-gray-900">
                <div className="container mx-auto px-4 py-8">
                    <header className="mb-8">
                        <h1 className="text-4xl font-bold text-white mb-2">KeymapCraft</h1>
                        <p className="text-gray-400">キーボード配列を視覚化・編集・共有</p>
                    </header>

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                        {/* メインのキーボードエディタエリア */}
                        <div className="xl:col-span-2">
                            <KeyboardCanvas />
                        </div>

                        {/* 右側メニュー */}
                        <div className="xl:col-span-1 space-y-4">
                            <CollapsibleSection
                                title="プリセット配列"
                                icon={
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                        />
                                    </svg>
                                }
                                defaultExpanded={true}
                            >
                                <PresetSelector />
                            </CollapsibleSection>

                            <CollapsibleSection
                                title="レイアウトインポート"
                                icon={
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                                        />
                                    </svg>
                                }
                                defaultExpanded={false}
                            >
                                <LayoutImporter />
                            </CollapsibleSection>

                            <CollapsibleSection
                                title="ツールバー"
                                icon={
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
                                        />
                                    </svg>
                                }
                                defaultExpanded={true}
                            >
                                <Toolbar />
                            </CollapsibleSection>

                            {currentLayout && (
                                <CollapsibleSection
                                    title="レイアウト比較"
                                    icon={
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                            />
                                        </svg>
                                    }
                                    defaultExpanded={false}
                                >
                                    <LayoutComparison currentLayout={currentLayout} />
                                </CollapsibleSection>
                            )}

                            <CollapsibleSection
                                title="キーエディタ"
                                icon={
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                        />
                                    </svg>
                                }
                                defaultExpanded={true}
                            >
                                <KeyEditor />
                            </CollapsibleSection>
                        </div>
                    </div>
                </div>
            </div>
        </DndProvider>
    );
}

export default App;
