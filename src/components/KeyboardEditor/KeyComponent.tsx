import React from "react";
import { useDrag } from "react-dnd";
import { useSpring, animated } from "@react-spring/web";
import type { KeyDefinition } from "../../types/keyboard";
import { useKeyboardStore } from "../../stores/keyboardStore";

interface KeyComponentProps {
    keyDef: KeyDefinition;
}

const KeyComponent: React.FC<KeyComponentProps> = ({ keyDef }) => {
    const { selectedKeyId, selectKey, currentLayer, updateKeyPosition, setDragging } =
        useKeyboardStore();
    const isSelected = selectedKeyId === keyDef.id;

    // ドラッグ機能
    const [{ isDragging }, drag] = useDrag(
        () => ({
            type: "key",
            item: () => {
                setDragging(true, keyDef.id);
                return { id: keyDef.id, originalPosition: keyDef.position };
            },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
            end: (item, monitor) => {
                setDragging(false);
                if (!monitor.didDrop()) {
                    // ドロップされなかった場合は元の位置に戻す
                    updateKeyPosition(keyDef.id, item.originalPosition);
                }
            },
        }),
        [keyDef.id, keyDef.position, setDragging, updateKeyPosition]
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
        selectKey(keyDef.id);
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
        if (currentLayer === "normal" && keyDef.legends.shift !== keyDef.legends.normal) {
            return keyDef.legends.shift;
        }
        return null;
    };

    return (
        <animated.div
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ref={drag as any}
            className={`
                absolute rounded-lg border-2 cursor-pointer transition-colors duration-200
                flex flex-col items-center justify-center p-1 text-sm font-medium select-none
                ${
                    isSelected
                        ? "border-blue-400 bg-blue-900/50"
                        : "border-gray-600 bg-gray-800 hover:bg-gray-700 hover:border-gray-500"
                }
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

            {/* レイヤーインジケーター */}
            {currentLayer !== "normal" && (
                <div className="absolute top-1 right-1 text-xs text-blue-400">
                    {currentLayer.toUpperCase()}
                </div>
            )}
        </animated.div>
    );
};

export default KeyComponent;
