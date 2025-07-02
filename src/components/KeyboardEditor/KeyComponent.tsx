import React from "react";
import { useDrag } from "react-dnd";
import { useSpring, animated } from "@react-spring/web";
import type { KeyDefinition } from "../../types/keyboard";
import { useKeyboardStore } from "../../stores/keyboardStore";

interface KeyComponentProps {
    keyDef: KeyDefinition;
}

const KeyComponent: React.FC<KeyComponentProps> = ({ keyDef }) => {
    const {
        selectedKeyId,
        selectedKeyIds,
        selectKey,
        addToSelection,
        removeFromSelection,
        currentLayer,
        updateKeyPosition,
        updateKeySize,
        setDragging,
        setResizing,
        isResizing,
        resizingKeyId 
    } = useKeyboardStore();
    const isSelected = selectedKeyId === keyDef.id;
    const isMultiSelected = selectedKeyIds.includes(keyDef.id);

    // ドラッグ機能（リサイズ中は無効化）
    const [{ isDragging }, drag] = useDrag(
        () => ({
            type: "key",
            canDrag: () => !isResizing && resizingKeyId !== keyDef.id,
            item: () => {
                setDragging(true, keyDef.id);
                // 複数選択されている場合は、選択されたすべてのキーの情報を含める
                if (selectedKeyIds.length > 1 && isMultiSelected) {
                    return {
                        id: keyDef.id,
                        originalPosition: keyDef.position,
                        isMultipleSelection: true,
                        selectedKeyIds: selectedKeyIds,
                    };
                }
                return {
                    id: keyDef.id,
                    originalPosition: keyDef.position,
                    isMultipleSelection: false,
                };
            },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
            end: (item, monitor) => {
                setDragging(false);
                if (!monitor.didDrop()) {
                    // ドロップされなかった場合は元の位置に戻す
                    if (item.isMultipleSelection) {
                        // 複数選択の場合は元の位置には戻さない（複雑になるため）
                        return;
                    }
                    updateKeyPosition(keyDef.id, item.originalPosition);
                }
            },
        }),
        [
            keyDef.id,
            keyDef.position,
            setDragging,
            updateKeyPosition,
            isResizing,
            resizingKeyId,
            selectedKeyIds,
            isMultiSelected,
        ]
    );

    // アニメーション
    const springProps = useSpring({
        opacity: isDragging ? 0.5 : 1,
        transform: isSelected ? "scale(1.05)" : "scale(1)",
        boxShadow: isSelected ? "0 0 20px rgba(59, 130, 246, 0.5)" : "0 2px 4px rgba(0, 0, 0, 0.3)",
        config: { tension: 300, friction: 30 },
    });

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();

        if (e.ctrlKey || e.metaKey) {
            // Ctrl+クリックで複数選択のトグル
            if (isMultiSelected) {
                removeFromSelection(keyDef.id);
            } else {
                addToSelection(keyDef.id);
            }
        } else {
            // 通常のクリック
            selectKey(keyDef.id);
        }
    };

    // リサイズハンドルのマウスダウンイベント
    const handleResizeMouseDown = (
        e: React.MouseEvent,
        direction: "right" | "bottom" | "corner"
    ) => {
        e.preventDefault();
        e.stopPropagation();

        setResizing(true, keyDef.id, direction);

        const startX = e.clientX;
        const startY = e.clientY;
        const startWidth = keyDef.size.width;
        const startHeight = keyDef.size.height;

        const handleMouseMove = (moveEvent: MouseEvent) => {
            const deltaX = (moveEvent.clientX - startX) / 50; // 50px = 1u
            const deltaY = (moveEvent.clientY - startY) / 50;

            let newWidth = startWidth;
            let newHeight = startHeight;

            if (direction === "right" || direction === "corner") {
                newWidth = Math.max(0.5, Math.round((startWidth + deltaX) * 4) / 4); // 0.25u刻み
            }
            if (direction === "bottom" || direction === "corner") {
                newHeight = Math.max(0.5, Math.round((startHeight + deltaY) * 4) / 4); // 0.25u刻み
            }

            updateKeySize(keyDef.id, { width: newWidth, height: newHeight });
        };

        const handleMouseUp = () => {
            setResizing(false);
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    // キーサイズをピクセルに変換（1u = 50px）
    const keyWidth = keyDef.size.width * 50;
    const keyHeight = keyDef.size.height * 50;

    // 現在のレイヤーに応じて表示する文字を決定
    const getCurrentLegend = () => {
        switch (currentLayer) {
            case "shift":
                return keyDef.legends.shift;
            case "fn":
                return keyDef.legends.fn || keyDef.legends.normal;
            case "altgr":
                return keyDef.legends.altgr || keyDef.legends.normal;
            default:
                return keyDef.legends.normal;
        }
    };

    const getShiftLegend = () => {
        // 通常レイヤーでのみShift文字を表示
        if (currentLayer === "normal" && keyDef.legends.shift !== keyDef.legends.normal) {
            return keyDef.legends.shift;
        }
        return null;
    };

    // レイヤーごとの色を取得
    const getLayerColor = () => {
        // 選択状態を判定（単一選択または複数選択）
        const isAnySelected = isSelected || isMultiSelected;

        switch (currentLayer) {
            case "shift":
                return isAnySelected
                    ? "border-yellow-400 bg-yellow-900/50"
                    : "border-yellow-600 bg-yellow-800/30 hover:bg-yellow-700/50";
            case "fn":
                return isAnySelected
                    ? "border-green-400 bg-green-900/50"
                    : "border-green-600 bg-green-800/30 hover:bg-green-700/50";
            case "altgr":
                return isAnySelected
                    ? "border-purple-400 bg-purple-900/50"
                    : "border-purple-600 bg-purple-800/30 hover:bg-purple-700/50";
            default:
                if (isMultiSelected && !isSelected) {
                    // 複数選択されているが、単一選択されていない場合（セカンダリ選択）
                    return "border-blue-300 bg-blue-800/30";
                }
                return isAnySelected
                    ? "border-blue-400 bg-blue-900/50"
                    : "border-gray-600 bg-gray-800 hover:bg-gray-700 hover:border-gray-500";
        }
    };

    return (
        <animated.div
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ref={drag as any}
            className={`
                key-component absolute rounded-lg border-2 cursor-pointer transition-colors duration-200
                flex flex-col items-center justify-center p-1 text-sm font-medium select-none
                ${getLayerColor()}
                ${isDragging ? "z-50" : "z-10"}
            `}
            style={{
                ...springProps,
                left: `${keyDef.position.x * 50}px`,
                top: `${keyDef.position.y * 50}px`,
                width: `${keyWidth}px`,
                height: `${keyHeight}px`,
            }}
            onClick={handleClick}
        >
            {/* Shift文字（上段） */}
            {getShiftLegend() && (
                <div className="text-xs text-gray-400 leading-none">{getShiftLegend()}</div>
            )}

            {/* 現在のレイヤーの文字（下段） */}
            <div className={`text-white leading-none ${getShiftLegend() ? "" : "text-center"}`}>
                {getCurrentLegend()}
            </div>

            {/* リサイズハンドル（選択されたキーのみ表示） */}
            {isSelected && !isDragging && (
                <>
                    {/* 右端リサイズハンドル */}
                    <div
                        className="absolute right-0 top-0 bottom-0 w-2 cursor-ew-resize bg-blue-500/30 hover:bg-blue-500/50 transition-colors"
                        style={{ right: "-4px" }}
                        onMouseDown={(e) => handleResizeMouseDown(e, "right")}
                    />

                    {/* 下端リサイズハンドル */}
                    <div
                        className="absolute bottom-0 left-0 right-0 h-2 cursor-ns-resize bg-blue-500/30 hover:bg-blue-500/50 transition-colors"
                        style={{ bottom: "-4px" }}
                        onMouseDown={(e) => handleResizeMouseDown(e, "bottom")}
                    />

                    {/* 右下角リサイズハンドル */}
                    <div
                        className="absolute bottom-0 right-0 w-3 h-3 cursor-nwse-resize bg-blue-500/50 hover:bg-blue-500/70 transition-colors rounded-tl"
                        style={{ bottom: "-4px", right: "-4px" }}
                        onMouseDown={(e) => handleResizeMouseDown(e, "corner")}
                    />
                </>
            )}
        </animated.div>
    );
};

export default KeyComponent;
