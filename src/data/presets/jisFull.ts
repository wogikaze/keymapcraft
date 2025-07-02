import type { KeyboardLayout } from "../../types/keyboard";

export const jisFullLayout: KeyboardLayout = {
    id: "jis-full",
    name: "JIS フル配列",
    description: "Japanese JIS full keyboard layout with F-keys",
    keys: [
        // Function keys row
        {
            id: "esc",
            position: { x: 0, y: 0 },
            size: { width: 1, height: 1 },
            keycode: "Escape",
            legends: { normal: "Esc", shift: "Esc" }
        },
        {
            id: "f1",
            position: { x: 1, y: 0 },
            size: { width: 1, height: 1 },
            keycode: "F1",
            legends: { normal: "F1", shift: "F1" }
        },
        {
            id: "f2",
            position: { x: 2, y: 0 },
            size: { width: 1, height: 1 },
            keycode: "F2",
            legends: { normal: "F2", shift: "F2" }
        },
        {
            id: "f3",
            position: { x: 3, y: 0 },
            size: { width: 1, height: 1 },
            keycode: "F3",
            legends: { normal: "F3", shift: "F3" }
        },
        {
            id: "f4",
            position: { x: 4, y: 0 },
            size: { width: 1, height: 1 },
            keycode: "F4",
            legends: { normal: "F4", shift: "F4" }
        },
        {
            id: "f5",
            position: { x: 5, y: 0 },
            size: { width: 1, height: 1 },
            keycode: "F5",
            legends: { normal: "F5", shift: "F5" }
        },
        {
            id: "f6",
            position: { x: 6, y: 0 },
            size: { width: 1, height: 1 },
            keycode: "F6",
            legends: { normal: "F6", shift: "F6" }
        },
        {
            id: "f7",
            position: { x: 7, y: 0 },
            size: { width: 1, height: 1 },
            keycode: "F7",
            legends: { normal: "F7", shift: "F7" }
        },
        {
            id: "f8",
            position: { x: 8, y: 0 },
            size: { width: 1, height: 1 },
            keycode: "F8",
            legends: { normal: "F8", shift: "F8" }
        },
        {
            id: "f9",
            position: { x: 9, y: 0 },
            size: { width: 1, height: 1 },
            keycode: "F9",
            legends: { normal: "F9", shift: "F9" }
        },
        {
            id: "f10",
            position: { x: 10, y: 0 },
            size: { width: 1, height: 1 },
            keycode: "F10",
            legends: { normal: "F10", shift: "F10" }
        },
        {
            id: "f11",
            position: { x: 11, y: 0 },
            size: { width: 1, height: 1 },
            keycode: "F11",
            legends: { normal: "F11", shift: "F11" }
        },
        {
            id: "f12",
            position: { x: 12, y: 0 },
            size: { width: 1, height: 1 },
            keycode: "F12",
            legends: { normal: "F12", shift: "F12" }
        },
        {
            id: "backslash_top",
            position: { x: 13, y: 0 },
            size: { width: 1, height: 1 },
            keycode: "IntlRo",
            legends: { normal: "\\", shift: "_" }
        },
        {
            id: "delete",
            position: { x: 14, y: 0 },
            size: { width: 1, height: 1 },
            keycode: "Delete",
            legends: { normal: "Del", shift: "Del" }
        },

        // Number row
        {
            id: "hankaku_zenkaku",
            position: { x: 0, y: 1.5 },
            size: { width: 1, height: 1 },
            keycode: "IntlHalfFullWidth",
            legends: { normal: "半角\n全角", shift: "半角\n全角" }
        },
        {
            id: "key1",
            position: { x: 1, y: 1.5 },
            size: { width: 1, height: 1 },
            keycode: "Digit1",
            legends: { normal: "1", shift: "!" }
        },
        {
            id: "key2",
            position: { x: 2, y: 1.5 },
            size: { width: 1, height: 1 },
            keycode: "Digit2",
            legends: { normal: "2", shift: "\"" }
        },
        {
            id: "key3",
            position: { x: 3, y: 1.5 },
            size: { width: 1, height: 1 },
            keycode: "Digit3",
            legends: { normal: "3", shift: "#" }
        },
        {
            id: "key4",
            position: { x: 4, y: 1.5 },
            size: { width: 1, height: 1 },
            keycode: "Digit4",
            legends: { normal: "4", shift: "$" }
        },
        {
            id: "key5",
            position: { x: 5, y: 1.5 },
            size: { width: 1, height: 1 },
            keycode: "Digit5",
            legends: { normal: "5", shift: "%" }
        },
        {
            id: "key6",
            position: { x: 6, y: 1.5 },
            size: { width: 1, height: 1 },
            keycode: "Digit6",
            legends: { normal: "6", shift: "&" }
        },
        {
            id: "key7",
            position: { x: 7, y: 1.5 },
            size: { width: 1, height: 1 },
            keycode: "Digit7",
            legends: { normal: "7", shift: "'" }
        },
        {
            id: "key8",
            position: { x: 8, y: 1.5 },
            size: { width: 1, height: 1 },
            keycode: "Digit8",
            legends: { normal: "8", shift: "(" }
        },
        {
            id: "key9",
            position: { x: 9, y: 1.5 },
            size: { width: 1, height: 1 },
            keycode: "Digit9",
            legends: { normal: "9", shift: ")" }
        },
        {
            id: "key0",
            position: { x: 10, y: 1.5 },
            size: { width: 1, height: 1 },
            keycode: "Digit0",
            legends: { normal: "0", shift: "" }
        },
        {
            id: "minus",
            position: { x: 11, y: 1.5 },
            size: { width: 1, height: 1 },
            keycode: "Minus",
            legends: { normal: "-", shift: "=" }
        },
        {
            id: "caret",
            position: { x: 12, y: 1.5 },
            size: { width: 1, height: 1 },
            keycode: "Equal",
            legends: { normal: "^", shift: "~" }
        },
        {
            id: "backspace",
            position: { x: 13, y: 1.5 },
            size: { width: 2, height: 1 },
            keycode: "Backspace",
            legends: { normal: "BS", shift: "BS" }
        },

        // QWERTY row
        {
            id: "tab",
            position: { x: 0, y: 2.5 },
            size: { width: 1.5, height: 1 },
            keycode: "Tab",
            legends: { normal: "Tab", shift: "Tab" }
        },
        {
            id: "q",
            position: { x: 1.5, y: 2.5 },
            size: { width: 1, height: 1 },
            keycode: "KeyQ",
            legends: { normal: "q", shift: "Q" }
        },
        {
            id: "w",
            position: { x: 2.5, y: 2.5 },
            size: { width: 1, height: 1 },
            keycode: "KeyW",
            legends: { normal: "w", shift: "W" }
        },
        {
            id: "e",
            position: { x: 3.5, y: 2.5 },
            size: { width: 1, height: 1 },
            keycode: "KeyE",
            legends: { normal: "e", shift: "E" }
        },
        {
            id: "r",
            position: { x: 4.5, y: 2.5 },
            size: { width: 1, height: 1 },
            keycode: "KeyR",
            legends: { normal: "r", shift: "R" }
        },
        {
            id: "t",
            position: { x: 5.5, y: 2.5 },
            size: { width: 1, height: 1 },
            keycode: "KeyT",
            legends: { normal: "t", shift: "T" }
        },
        {
            id: "y",
            position: { x: 6.5, y: 2.5 },
            size: { width: 1, height: 1 },
            keycode: "KeyY",
            legends: { normal: "y", shift: "Y" }
        },
        {
            id: "u",
            position: { x: 7.5, y: 2.5 },
            size: { width: 1, height: 1 },
            keycode: "KeyU",
            legends: { normal: "u", shift: "U" }
        },
        {
            id: "i",
            position: { x: 8.5, y: 2.5 },
            size: { width: 1, height: 1 },
            keycode: "KeyI",
            legends: { normal: "i", shift: "I" }
        },
        {
            id: "o",
            position: { x: 9.5, y: 2.5 },
            size: { width: 1, height: 1 },
            keycode: "KeyO",
            legends: { normal: "o", shift: "O" }
        },
        {
            id: "p",
            position: { x: 10.5, y: 2.5 },
            size: { width: 1, height: 1 },
            keycode: "KeyP",
            legends: { normal: "p", shift: "P" }
        },
        {
            id: "at",
            position: { x: 11.5, y: 2.5 },
            size: { width: 1, height: 1 },
            keycode: "BracketLeft",
            legends: { normal: "@", shift: "`" }
        },
        {
            id: "bracket_left",
            position: { x: 12.5, y: 2.5 },
            size: { width: 1, height: 1 },
            keycode: "BracketRight",
            legends: { normal: "[", shift: "{" }
        },

        // Enter key (ISO style)
        {
            id: "enter",
            position: { x: 13.75, y: 2.5 },
            size: { width: 1.25, height: 2 },
            keycode: "Enter",
            legends: { normal: "Enter", shift: "Enter" }
        },

        // ASDF row
        {
            id: "caps",
            position: { x: 0, y: 3.5 },
            size: { width: 1.75, height: 1 },
            keycode: "CapsLock",
            legends: { normal: "Caps", shift: "Caps" }
        },
        {
            id: "a",
            position: { x: 1.75, y: 3.5 },
            size: { width: 1, height: 1 },
            keycode: "KeyA",
            legends: { normal: "a", shift: "A" }
        },
        {
            id: "s",
            position: { x: 2.75, y: 3.5 },
            size: { width: 1, height: 1 },
            keycode: "KeyS",
            legends: { normal: "s", shift: "S" }
        },
        {
            id: "d",
            position: { x: 3.75, y: 3.5 },
            size: { width: 1, height: 1 },
            keycode: "KeyD",
            legends: { normal: "d", shift: "D" }
        },
        {
            id: "f",
            position: { x: 4.75, y: 3.5 },
            size: { width: 1, height: 1 },
            keycode: "KeyF",
            legends: { normal: "f", shift: "F" }
        },
        {
            id: "g",
            position: { x: 5.75, y: 3.5 },
            size: { width: 1, height: 1 },
            keycode: "KeyG",
            legends: { normal: "g", shift: "G" }
        },
        {
            id: "h",
            position: { x: 6.75, y: 3.5 },
            size: { width: 1, height: 1 },
            keycode: "KeyH",
            legends: { normal: "h", shift: "H" }
        },
        {
            id: "j",
            position: { x: 7.75, y: 3.5 },
            size: { width: 1, height: 1 },
            keycode: "KeyJ",
            legends: { normal: "j", shift: "J" }
        },
        {
            id: "k",
            position: { x: 8.75, y: 3.5 },
            size: { width: 1, height: 1 },
            keycode: "KeyK",
            legends: { normal: "k", shift: "K" }
        },
        {
            id: "l",
            position: { x: 9.75, y: 3.5 },
            size: { width: 1, height: 1 },
            keycode: "KeyL",
            legends: { normal: "l", shift: "L" }
        },
        {
            id: "semicolon",
            position: { x: 10.75, y: 3.5 },
            size: { width: 1, height: 1 },
            keycode: "Semicolon",
            legends: { normal: ";", shift: "+" }
        },
        {
            id: "colon",
            position: { x: 11.75, y: 3.5 },
            size: { width: 1, height: 1 },
            keycode: "Quote",
            legends: { normal: ":", shift: "*" }
        },
        {
            id: "bracket_right",
            position: { x: 12.75, y: 3.5 },
            size: { width: 1, height: 1 },
            keycode: "Backslash",
            legends: { normal: "]", shift: "}" }
        },

        // ZXCV row
        {
            id: "shift_left",
            position: { x: 0, y: 4.5 },
            size: { width: 2.25, height: 1 },
            keycode: "ShiftLeft",
            legends: { normal: "Shift", shift: "Shift" }
        },
        {
            id: "z",
            position: { x: 2.25, y: 4.5 },
            size: { width: 1, height: 1 },
            keycode: "KeyZ",
            legends: { normal: "z", shift: "Z" }
        },
        {
            id: "x",
            position: { x: 3.25, y: 4.5 },
            size: { width: 1, height: 1 },
            keycode: "KeyX",
            legends: { normal: "x", shift: "X" }
        },
        {
            id: "c",
            position: { x: 4.25, y: 4.5 },
            size: { width: 1, height: 1 },
            keycode: "KeyC",
            legends: { normal: "c", shift: "C" }
        },
        {
            id: "v",
            position: { x: 5.25, y: 4.5 },
            size: { width: 1, height: 1 },
            keycode: "KeyV",
            legends: { normal: "v", shift: "V" }
        },
        {
            id: "b",
            position: { x: 6.25, y: 4.5 },
            size: { width: 1, height: 1 },
            keycode: "KeyB",
            legends: { normal: "b", shift: "B" }
        },
        {
            id: "n",
            position: { x: 7.25, y: 4.5 },
            size: { width: 1, height: 1 },
            keycode: "KeyN",
            legends: { normal: "n", shift: "N" }
        },
        {
            id: "m",
            position: { x: 8.25, y: 4.5 },
            size: { width: 1, height: 1 },
            keycode: "KeyM",
            legends: { normal: "m", shift: "M" }
        },
        {
            id: "comma",
            position: { x: 9.25, y: 4.5 },
            size: { width: 1, height: 1 },
            keycode: "Comma",
            legends: { normal: ",", shift: "<" }
        },
        {
            id: "period",
            position: { x: 10.25, y: 4.5 },
            size: { width: 1, height: 1 },
            keycode: "Period",
            legends: { normal: ".", shift: ">" }
        },
        {
            id: "slash",
            position: { x: 11.25, y: 4.5 },
            size: { width: 1, height: 1 },
            keycode: "Slash",
            legends: { normal: "/", shift: "?" }
        },
        {
            id: "backslash_jis",
            position: { x: 12.25, y: 4.5 },
            size: { width: 1, height: 1 },
            keycode: "IntlRo",
            legends: { normal: "\\", shift: "_" }
        },
        {
            id: "shift_right",
            position: { x: 13.25, y: 4.5 },
            size: { width: 1.75, height: 1 },
            keycode: "ShiftRight",
            legends: { normal: "Shift", shift: "Shift" }
        },

        // Bottom row
        {
            id: "ctrl_left",
            position: { x: 0, y: 5.5 },
            size: { width: 1.5, height: 1 },
            keycode: "ControlLeft",
            legends: { normal: "Ctrl", shift: "Ctrl" }
        },
        {
            id: "fn",
            position: { x: 1.5, y: 5.5 },
            size: { width: 1, height: 1 },
            keycode: "Fn",
            legends: { normal: "Fn", shift: "Fn" }
        },
        {
            id: "win_left",
            position: { x: 2.5, y: 5.5 },
            size: { width: 1, height: 1 },
            keycode: "MetaLeft",
            legends: { normal: "Win", shift: "Win" }
        },
        {
            id: "alt_left",
            position: { x: 3.5, y: 5.5 },
            size: { width: 1, height: 1 },
            keycode: "AltLeft",
            legends: { normal: "Alt", shift: "Alt" }
        },
        {
            id: "muhenkan",
            position: { x: 4.5, y: 5.5 },
            size: { width: 1, height: 1 },
            keycode: "NonConvert",
            legends: { normal: "無変換", shift: "無変換" }
        },
        {
            id: "space",
            position: { x: 5.5, y: 5.5 },
            size: { width: 4, height: 1 },
            keycode: "Space",
            legends: { normal: "Space", shift: "Space" }
        },
        {
            id: "henkan",
            position: { x: 9.5, y: 5.5 },
            size: { width: 1, height: 1 },
            keycode: "Convert",
            legends: { normal: "変換", shift: "変換" }
        },
        {
            id: "katakana",
            position: { x: 10.5, y: 5.5 },
            size: { width: 1, height: 1 },
            keycode: "KanaMode",
            legends: { normal: "カタ\nひら", shift: "カタ\nひら" }
        },
        {
            id: "alt_right",
            position: { x: 11.5, y: 5.5 },
            size: { width: 1, height: 1 },
            keycode: "AltRight",
            legends: { normal: "Alt", shift: "Alt" }
        },
        {
            id: "menu",
            position: { x: 12.5, y: 5.5 },
            size: { width: 1, height: 1 },
            keycode: "ContextMenu",
            legends: { normal: "Menu", shift: "Menu" }
        },
        {
            id: "ctrl_right",
            position: { x: 13.5, y: 5.5 },
            size: { width: 1.5, height: 1 },
            keycode: "ControlRight",
            legends: { normal: "Ctrl", shift: "Ctrl" }
        }
    ],
    metadata: {
        language: "ja",
        region: "JP",
        layoutType: "JIS",
        keyCount: 79,
        author: "User",
        tags: ["JIS", "Japanese", "Full-size", "F-keys"]
    },
    createdAt: new Date("2025-07-02T07:23:36.214Z").toISOString(),
    updatedAt: new Date("2025-07-02T07:32:13.612Z").toISOString()
};
