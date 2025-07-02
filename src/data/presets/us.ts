import type { KeyboardLayout } from '../../types/keyboard';

// US配列のレイアウトデータ（wogikazeキーボード用）
export const usLayout: KeyboardLayout = {
    id: 'us-wogikaze_1751441973214',
    name: 'US Wogikaze配列',
    description: 'US ANSI compact keyboard layout for Wogikaze (F1-F12キー列なし)',
    keys: [
        // 第1行: 数字キー行（Escを含む）
        { id: 'esc', position: { x: 0, y: 0 }, size: { width: 1, height: 1 }, keycode: 'Escape', legends: { normal: 'Esc', shift: 'Esc' } },
        { id: 'key1', position: { x: 1, y: 0 }, size: { width: 1, height: 1 }, keycode: 'Digit1', legends: { normal: '1', shift: '!' } },
        { id: 'key2', position: { x: 2, y: 0 }, size: { width: 1, height: 1 }, keycode: 'Digit2', legends: { normal: '2', shift: '@' } },
        { id: 'key3', position: { x: 3, y: 0 }, size: { width: 1, height: 1 }, keycode: 'Digit3', legends: { normal: '3', shift: '#' } },
        { id: 'key4', position: { x: 4, y: 0 }, size: { width: 1, height: 1 }, keycode: 'Digit4', legends: { normal: '4', shift: '$' } },
        { id: 'key5', position: { x: 5, y: 0 }, size: { width: 1, height: 1 }, keycode: 'Digit5', legends: { normal: '5', shift: '%' } },
        { id: 'key6', position: { x: 6, y: 0 }, size: { width: 1, height: 1 }, keycode: 'Digit6', legends: { normal: '6', shift: '^' } },
        { id: 'key7', position: { x: 7, y: 0 }, size: { width: 1, height: 1 }, keycode: 'Digit7', legends: { normal: '7', shift: '&' } },
        { id: 'key8', position: { x: 8, y: 0 }, size: { width: 1, height: 1 }, keycode: 'Digit8', legends: { normal: '8', shift: '*' } },
        { id: 'key9', position: { x: 9, y: 0 }, size: { width: 1, height: 1 }, keycode: 'Digit9', legends: { normal: '9', shift: '(' } },
        { id: 'key0', position: { x: 10, y: 0 }, size: { width: 1, height: 1 }, keycode: 'Digit0', legends: { normal: '0', shift: ')' } },
        { id: 'minus', position: { x: 11, y: 0 }, size: { width: 1, height: 1 }, keycode: 'Minus', legends: { normal: '-', shift: '_' } },
        { id: 'equal', position: { x: 12, y: 0 }, size: { width: 1, height: 1 }, keycode: 'Equal', legends: { normal: '=', shift: '+' } },
        { id: 'backspace', position: { x: 13, y: 0 }, size: { width: 2, height: 1 }, keycode: 'Backspace', legends: { normal: 'Backspace', shift: 'Backspace' } },

        // 第2行: Tab行
        { id: 'tab', position: { x: 0, y: 1 }, size: { width: 1.5, height: 1 }, keycode: 'Tab', legends: { normal: 'Tab', shift: 'Tab' } },
        { id: 'q', position: { x: 1.5, y: 1 }, size: { width: 1, height: 1 }, keycode: 'KeyQ', legends: { normal: 'q', shift: 'Q' } },
        { id: 'w', position: { x: 2.5, y: 1 }, size: { width: 1, height: 1 }, keycode: 'KeyW', legends: { normal: 'w', shift: 'W' } },
        { id: 'e', position: { x: 3.5, y: 1 }, size: { width: 1, height: 1 }, keycode: 'KeyE', legends: { normal: 'e', shift: 'E' } },
        { id: 'r', position: { x: 4.5, y: 1 }, size: { width: 1, height: 1 }, keycode: 'KeyR', legends: { normal: 'r', shift: 'R' } },
        { id: 't', position: { x: 5.5, y: 1 }, size: { width: 1, height: 1 }, keycode: 'KeyT', legends: { normal: 't', shift: 'T' } },
        { id: 'y', position: { x: 6.5, y: 1 }, size: { width: 1, height: 1 }, keycode: 'KeyY', legends: { normal: 'y', shift: 'Y' } },
        { id: 'u', position: { x: 7.5, y: 1 }, size: { width: 1, height: 1 }, keycode: 'KeyU', legends: { normal: 'u', shift: 'U' } },
        { id: 'i', position: { x: 8.5, y: 1 }, size: { width: 1, height: 1 }, keycode: 'KeyI', legends: { normal: 'i', shift: 'I' } },
        { id: 'o', position: { x: 9.5, y: 1 }, size: { width: 1, height: 1 }, keycode: 'KeyO', legends: { normal: 'o', shift: 'O' } },
        { id: 'p', position: { x: 10.5, y: 1 }, size: { width: 1, height: 1 }, keycode: 'KeyP', legends: { normal: 'p', shift: 'P' } },
        { id: 'bracket_left', position: { x: 11.5, y: 1 }, size: { width: 1, height: 1 }, keycode: 'BracketLeft', legends: { normal: '[', shift: '{' } },
        { id: 'bracket_right', position: { x: 12.5, y: 1 }, size: { width: 1, height: 1 }, keycode: 'BracketRight', legends: { normal: ']', shift: '}' } },
        { id: 'backslash', position: { x: 13.5, y: 1 }, size: { width: 1.5, height: 1 }, keycode: 'Backslash', legends: { normal: '\\', shift: '|' } },

        // 第3行: CapsLock行
        { id: 'caps', position: { x: 0, y: 2 }, size: { width: 1.75, height: 1 }, keycode: 'CapsLock', legends: { normal: 'Caps', shift: 'Caps' } },
        { id: 'a', position: { x: 1.75, y: 2 }, size: { width: 1, height: 1 }, keycode: 'KeyA', legends: { normal: 'a', shift: 'A' } },
        { id: 's', position: { x: 2.75, y: 2 }, size: { width: 1, height: 1 }, keycode: 'KeyS', legends: { normal: 's', shift: 'S' } },
        { id: 'd', position: { x: 3.75, y: 2 }, size: { width: 1, height: 1 }, keycode: 'KeyD', legends: { normal: 'd', shift: 'D' } },
        { id: 'f', position: { x: 4.75, y: 2 }, size: { width: 1, height: 1 }, keycode: 'KeyF', legends: { normal: 'f', shift: 'F' } },
        { id: 'g', position: { x: 5.75, y: 2 }, size: { width: 1, height: 1 }, keycode: 'KeyG', legends: { normal: 'g', shift: 'G' } },
        { id: 'h', position: { x: 6.75, y: 2 }, size: { width: 1, height: 1 }, keycode: 'KeyH', legends: { normal: 'h', shift: 'H' } },
        { id: 'j', position: { x: 7.75, y: 2 }, size: { width: 1, height: 1 }, keycode: 'KeyJ', legends: { normal: 'j', shift: 'J' } },
        { id: 'k', position: { x: 8.75, y: 2 }, size: { width: 1, height: 1 }, keycode: 'KeyK', legends: { normal: 'k', shift: 'K' } },
        { id: 'l', position: { x: 9.75, y: 2 }, size: { width: 1, height: 1 }, keycode: 'KeyL', legends: { normal: 'l', shift: 'L' } },
        { id: 'semicolon', position: { x: 10.75, y: 2 }, size: { width: 1, height: 1 }, keycode: 'Semicolon', legends: { normal: ';', shift: ':' } },
        { id: 'quote', position: { x: 11.75, y: 2 }, size: { width: 1, height: 1 }, keycode: 'Quote', legends: { normal: '\'', shift: '"' } },
        { id: 'enter', position: { x: 12.75, y: 2 }, size: { width: 2.25, height: 1 }, keycode: 'Enter', legends: { normal: 'Enter', shift: 'Enter' } },

        // 第4行: Shift行
        { id: 'shift_left', position: { x: 0, y: 3 }, size: { width: 2.25, height: 1 }, keycode: 'ShiftLeft', legends: { normal: 'Shift', shift: 'Shift' } },
        { id: 'z', position: { x: 2.25, y: 3 }, size: { width: 1, height: 1 }, keycode: 'KeyZ', legends: { normal: 'z', shift: 'Z' } },
        { id: 'x', position: { x: 3.25, y: 3 }, size: { width: 1, height: 1 }, keycode: 'KeyX', legends: { normal: 'x', shift: 'X' } },
        { id: 'c', position: { x: 4.25, y: 3 }, size: { width: 1, height: 1 }, keycode: 'KeyC', legends: { normal: 'c', shift: 'C' } },
        { id: 'v', position: { x: 5.25, y: 3 }, size: { width: 1, height: 1 }, keycode: 'KeyV', legends: { normal: 'v', shift: 'V' } },
        { id: 'b', position: { x: 6.25, y: 3 }, size: { width: 1, height: 1 }, keycode: 'KeyB', legends: { normal: 'b', shift: 'B' } },
        { id: 'n', position: { x: 7.25, y: 3 }, size: { width: 1, height: 1 }, keycode: 'KeyN', legends: { normal: 'n', shift: 'N' } },
        { id: 'm', position: { x: 8.25, y: 3 }, size: { width: 1, height: 1 }, keycode: 'KeyM', legends: { normal: 'm', shift: 'M' } },
        { id: 'comma', position: { x: 9.25, y: 3 }, size: { width: 1, height: 1 }, keycode: 'Comma', legends: { normal: ',', shift: '<' } },
        { id: 'period', position: { x: 10.25, y: 3 }, size: { width: 1, height: 1 }, keycode: 'Period', legends: { normal: '.', shift: '>' } },
        { id: 'slash', position: { x: 11.25, y: 3 }, size: { width: 1, height: 1 }, keycode: 'Slash', legends: { normal: '/', shift: '?' } },
        { id: 'shift_right', position: { x: 12.25, y: 3 }, size: { width: 2.75, height: 1 }, keycode: 'ShiftRight', legends: { normal: 'Shift', shift: 'Shift' } },

        // 第5行: スペース行
        { id: 'ctrl_left', position: { x: 0, y: 4 }, size: { width: 1.25, height: 1 }, keycode: 'ControlLeft', legends: { normal: 'Ctrl', shift: 'Ctrl' } },
        { id: 'win_left', position: { x: 1.25, y: 4 }, size: { width: 1.25, height: 1 }, keycode: 'MetaLeft', legends: { normal: 'Win', shift: 'Win' } },
        { id: 'alt_left', position: { x: 2.5, y: 4 }, size: { width: 1.25, height: 1 }, keycode: 'AltLeft', legends: { normal: 'Alt', shift: 'Alt' } },
        { id: 'space', position: { x: 3.75, y: 4 }, size: { width: 6.25, height: 1 }, keycode: 'Space', legends: { normal: 'Space', shift: 'Space' } },
        { id: 'alt_right', position: { x: 10, y: 4 }, size: { width: 1.25, height: 1 }, keycode: 'AltRight', legends: { normal: 'Alt', shift: 'Alt' } },
        { id: 'fn', position: { x: 11.25, y: 4 }, size: { width: 1.25, height: 1 }, keycode: 'Fn', legends: { normal: 'Fn', shift: 'Fn' } },
        { id: 'menu', position: { x: 12.5, y: 4 }, size: { width: 1.25, height: 1 }, keycode: 'ContextMenu', legends: { normal: 'Menu', shift: 'Menu' } },
        { id: 'ctrl_right', position: { x: 13.75, y: 4 }, size: { width: 1.25, height: 1 }, keycode: 'ControlRight', legends: { normal: 'Ctrl', shift: 'Ctrl' } },
    ],
    metadata: {
        language: 'en',
        region: 'US',
        layoutType: 'ANSI',
        keyCount: 69,
        author: 'Wogikaze',
        tags: ['US', 'ANSI', 'Compact', 'Wogikaze']
    },
    createdAt: new Date("2025-07-02T07:23:36.216Z").toISOString(),
    updatedAt: new Date("2025-07-02T07:40:44.396Z").toISOString()
};
