import KeyboardCanvas from "./components/KeyboardEditor/KeyboardCanvas";
import KeyEditor from "./components/KeyboardEditor/KeyEditor";

function App() {
    return (
        <div className="min-h-screen bg-gray-900">
            <div className="container mx-auto px-4 py-8">
                <header className="mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">KeymapCraft</h1>
                    <p className="text-gray-400">キーボード配列を視覚化・編集・共有</p>
                </header>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    <div className="xl:col-span-2">
                        <KeyboardCanvas />
                    </div>

                    <div className="xl:col-span-1">
                        <KeyEditor />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
