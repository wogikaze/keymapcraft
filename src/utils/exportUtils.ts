import type { KeyboardLayout } from '../types/keyboard';

export const exportToJSON = (layout: KeyboardLayout, fileName?: string): void => {
    const json = JSON.stringify(layout, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName || layout.name || 'keyboard'}.json`;
    a.click();
    URL.revokeObjectURL(url);
};

export const exportToPNG = async (layout: KeyboardLayout, fileName?: string): Promise<void> => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas context not available');

    // キーボードサイズを計算
    const maxX = Math.max(...layout.keys.map((key) => key.position.x + key.size.width));
    const maxY = Math.max(...layout.keys.map((key) => key.position.y + key.size.height));

    const padding = 50;
    const keySize = 50;
    canvas.width = maxX * keySize + padding * 2;
    canvas.height = maxY * keySize + padding * 2;

    // 背景
    ctx.fillStyle = '#1f2937'; // gray-800
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // フォント設定
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // キーを描画
    layout.keys.forEach((key) => {
        const x = key.position.x * keySize + padding;
        const y = key.position.y * keySize + padding;
        const w = key.size.width * keySize;
        const h = key.size.height * keySize;

        // キー背景
        ctx.fillStyle = '#374151'; // gray-700
        ctx.fillRect(x, y, w, h);

        // キーボーダー
        ctx.strokeStyle = '#4b5563'; // gray-600
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, w, h);

        // キーテキスト
        ctx.fillStyle = '#ffffff';

        if (key.legends.shift !== key.legends.normal) {
            // Shift文字（上）
            ctx.font = '10px Arial';
            ctx.fillText(key.legends.shift, x + w / 2, y + h / 3);

            // 通常文字（下）
            ctx.font = '12px Arial';
            ctx.fillText(key.legends.normal, x + w / 2, y + 2 * h / 3);
        } else {
            // 中央に通常文字
            ctx.font = '12px Arial';
            ctx.fillText(key.legends.normal, x + w / 2, y + h / 2);
        }
    });

    // タイトルを追加
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(layout.name, padding, 30);

    // ダウンロード
    canvas.toBlob((blob) => {
        if (blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${fileName || layout.name || 'keyboard'}.png`;
            a.click();
            URL.revokeObjectURL(url);
        }
    }, 'image/png');
};

export const exportToURL = (layout: KeyboardLayout): string => {
    const compressedData = btoa(JSON.stringify(layout));
    return `${window.location.origin}${window.location.pathname}?layout=${compressedData}`;
};

export const importFromURL = (): KeyboardLayout | null => {
    const urlParams = new URLSearchParams(window.location.search);
    const layoutData = urlParams.get('layout');

    if (layoutData) {
        try {
            const decompressed = atob(layoutData);
            return JSON.parse(decompressed);
        } catch (error) {
            console.error('URL import error:', error);
            return null;
        }
    }

    return null;
};
