# KeymapCraft

A web application for visualizing, editing, and sharing keyboard layouts.

## Features

- Flexible keyboard layout editing with 0.25u precision
- Drag & drop interface with visual guides
- Multi-layer support (Normal, Shift, Fn, AltGr)
- Layout comparison and sharing
- Export/Import in JSON and PNG formats
- Preset layouts (JIS Full, JIS Compact, US)

## Tech Stack

- React 19 + TypeScript
- Vite
- TailwindCSS
- Zustand for state management
- React-DnD for drag & drop

## Installation

```bash
npm install
npm run dev
```

## Usage

1. Select a preset layout or create a new one
2. Edit key positions and sizes using drag & drop
3. Modify key legends across different layers
4. Export or share your layout

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

MIT License

Copyright (c) 2024 wgkz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.