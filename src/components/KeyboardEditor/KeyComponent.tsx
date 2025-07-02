import React from "react";
import type { KeyDefinition } from "../../types/keyboard";
import { useKeyboardStore } from "../../stores/keyboardStore";

interface KeyComponentProps {
    keyDef: KeyDefinition;
}

const KeyComponent: React.FC<KeyComponentProps> = ({ keyDef }) => {
    const { selectedKeyId, selectKey } = useKeyboardStore();
    const isSelected = selectedKeyId === keyDef.id;

    const handleClick = () => {
        selectKey(keyDef.id);
    };

    // キーサイズをピクセルに変換（1u = 50px）
    const keyWidth = keyDef.size.width * 50;
    const keyHeight = keyDef.size.height * 50;

    return (
        <div
            className={`
        absolute rounded-lg border-2 cursor-pointer transition-all duration-200
        flex flex-col items-center justify-center p-1 text-sm font-medium
        ${
            isSelected
                ? "border-blue-400 bg-blue-900/50 shadow-lg shadow-blue-500/25"
                : "border-gray-600 bg-gray-800 hover:bg-gray-700 hover:border-gray-500"
        }
      `}
            style={{
                left: `${keyDef.position.x * 50}px`,
                top: `${keyDef.position.y * 50}px`,
                width: `${keyWidth}px`,
                height: `${keyHeight}px`,
            }}
            onClick={handleClick}
        >
            {/* Shift文字（上段） */}
            {keyDef.legends.shift !== keyDef.legends.normal && (
                <div className="text-xs text-gray-400 leading-none">{keyDef.legends.shift}</div>
            )}

            {/* 通常文字（下段） */}
            <div className="text-white leading-none">{keyDef.legends.normal}</div>
        </div>
    );
};

export default KeyComponent;
