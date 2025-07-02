# KeymapCraft - GitHub Copilot Instructions

## プロジェクト概要

**KeymapCraft**は、キーボードの配列を視覚化・編集・共有できるWebアプリケーションです。
ユーザーが自分のキーボード配列をカスタマイズし、他のユーザーと共有できるプラットフォームを提供します。

## 技術スタック

- **フロントエンド**: React 19 + TypeScript
- **ビルドツール**: Vite
- **スタイリング**: TailwindCSS
- **状態管理**: Zustand（予定）
- **UI操作**: React-DnD（ドラッグ&ドロップ）
- **アニメーション**: React-Spring

## 主要機能

### 1. キーボードエディタ
- フレキシブルなキーボードレイアウト編集
- キーの位置、サイズ、文字割り当ての変更
- ドラッグ&ドロップによる直感的な操作
- 複数レイヤー対応（通常、Shift、Fn等）

### 2. プリセット配列
- JIS配列（109キー）
- US配列（104キー）
- 60%配列やその他コンパクト配列
- カスタム配列の作成・保存

### 3. 比較機能
- 2つの配列の並列表示
- キーごとの差分をハイライト
- 詳細な違いの説明（例：JISの「2」キーのShift+2は「"」、USでは「@」）

### 4. 共有・エクスポート
- URLでの配列共有
- JSON形式でのエクスポート/インポート
- 画像形式でのエクスポート

## データ構造

### KeyboardLayout
```typescript
interface KeyboardLayout {
  id: string;
  name: string;
  description?: string;
  keys: KeyDefinition[];
  metadata: LayoutMetadata;
  createdAt: Date;
  updatedAt: Date;
}
```

### KeyDefinition
```typescript
interface KeyDefinition {
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
```

### LayoutMetadata
```typescript
interface LayoutMetadata {
  language: string;     // 'ja', 'en', etc.
  region: string;       // 'JP', 'US', etc.
  layoutType: string;   // 'JIS', 'ANSI', 'ISO'
  keyCount: number;
  author?: string;
  tags?: string[];
}
```

## ディレクトリ構造

```
src/
├── components/
│   ├── KeyboardEditor/       # キーボード編集関連
│   │   ├── KeyboardCanvas.tsx
│   │   ├── KeyComponent.tsx
│   │   ├── KeyEditor.tsx
│   │   └── Toolbar.tsx
│   ├── LayoutManager/        # レイアウト管理
│   │   ├── PresetSelector.tsx
│   │   ├── LayoutImporter.tsx
│   │   └── LayoutExporter.tsx
│   ├── Comparison/           # 比較機能
│   │   ├── LayoutComparison.tsx
│   │   └── DiffViewer.tsx
│   └── UI/                   # 共通UIコンポーネント
│       ├── Button.tsx
│       ├── Modal.tsx
│       └── Tooltip.tsx
├── stores/                   # 状態管理
│   ├── keyboardStore.ts
│   └── uiStore.ts
├── data/                     # プリセットデータ
│   ├── presets/
│   │   ├── jis.ts
│   │   ├── us.ts
│   │   └── compact.ts
│   └── keycodes.ts
├── utils/                    # ユーティリティ関数
│   ├── layoutUtils.ts
│   ├── exportUtils.ts
│   └── diffUtils.ts
└── types/                    # TypeScript型定義
    └── keyboard.ts
```

## 開発ガイドライン

### コーディングスタイル
- **TypeScript**: 厳密な型付けを心がける
- **関数型**: 可能な限り関数型プログラミングを採用
- **コンポーネント**: 小さく再利用可能なコンポーネントに分割
- **ネーミング**: 日本語プロジェクトですが、コード内は英語で統一

### スタイリング
- **TailwindCSS**: ユーティリティファーストのアプローチ
- **ダークテーマ**: メインテーマはダーク
- **レスポンシブ**: モバイルファーストデザイン
- **アニメーション**: 適度なアニメーションで操作感を向上

### 状態管理
- **Zustand**: 軽量で使いやすい状態管理
- **不変性**: 状態の更新は常に不変性を保つ
- **分離**: UI状態とビジネスロジックを分離

## 特別な要件

### キーボード表示
- キーは物理的な配置を正確に再現
- キーサイズは標準的なuユニット（1u = 約15mm）で管理
- キートップには通常文字とShift文字を両方表示

### 国際化対応
- JIS配列とUS配列の正確な違いを表現
- 各国の配列に対応できる拡張性
- Unicode文字の適切な表示

### パフォーマンス
- 大量のキー（100+）でもスムーズな操作
- リアルタイムな編集プレビュー
- 効率的な再レンダリング

## 実装優先度

### Phase 1 (MVP)
1. 基本的なキーボード表示
2. JIS/US配列プリセット
3. 基本的なキー編集

### Phase 2
1. ドラッグ&ドロップ機能
2. キーサイズ調整
3. レイヤー機能

### Phase 3
1. 配列比較機能
2. 共有機能
3. エクスポート機能

### Phase 4
1. UI/UX改善
2. アクセシビリティ
3. パフォーマンス最適化

## 注意事項

- キーボード配列は文化的に重要な要素なので、正確性を重視
- ユーザビリティを最優先に、直感的な操作を心がける
- 将来的な機能拡張を考慮した設計にする
- プライバシーを考慮し、ローカルストレージを基本とする
