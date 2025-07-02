export interface KeyDefinition {
    id: string;
    position: { x: number; y: number }; // グリッド座標
    size: { width: number; height: number }; // キーサイズ（uユニット）
    keycode: string; // 物理キーコード
    legends: {
        normal: string;      // 通常入力
        shift: string;       // Shift同時押し
        altgr?: string;      // AltGr（US International等）
        fn?: string;         // Fnキー同時押し
    };
    style?: {
        backgroundColor?: string;
        textColor?: string;
        borderColor?: string;
    };
}

export interface LayoutMetadata {
    language: string;     // 'ja', 'en', etc.
    region: string;       // 'JP', 'US', etc.
    layoutType: string;   // 'JIS', 'ANSI', 'ISO'
    keyCount: number;
    author?: string;
    tags?: string[];
}

export interface KeyboardLayout {
    id: string;
    name: string;
    description?: string;
    keys: KeyDefinition[];
    metadata: LayoutMetadata;
    createdAt: string;
    updatedAt: string;
}
