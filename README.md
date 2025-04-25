# Next.js Notion Avatar (Fork & Update)

**This project is a fork and update of the original [react-notion-avatar](https://github.com/zonemeen/react-notion-avatar) (MIT, 2021) by [zonemeen](https://github.com/zonemeen).**

This fork and update is maintained by **Joao Pedro Goncalves** ([GitHub](https://github.com/JoaoSobral/nextjs-notion-avatar)), **(MIT, 2025).**

---

## Components

This package provides two portable, ready-to-use avatar generator components:

- **NotionAvatarGenerator**: The full-featured, customizable avatar generator (all avatar parts, color picker, random/save/cancel actions).
- **SimpleAvatarGenerator**: A minimal version with only a color picker and action buttons (random/save/cancel), for quick use or embedding.

---

## Getting Started (NPM Package)

Install the package:

```bash
npm install nextjs-notion-avatar
# or
yarn add nextjs-notion-avatar
# or
pnpm add nextjs-notion-avatar
```

---

## Usage: NotionAvatarGenerator (Full)

```jsx
import { NotionAvatarGenerator } from 'nextjs-notion-avatar';

<NotionAvatarGenerator
  onCancel={() => { /* handle cancel */ }}
  onRandom={(config, bgColor) => { /* handle random config */ }}
  onSave={(config, bgColor) => { /* handle save config */ }}
  actionButtonProps={{
    background: '#000',
    color: '#fff',
    borderRadius: '0.75rem',
    width: '180px',
    fontSize: '1.125rem',
    fontWeight: 600,
    padding: '0.5rem 1.5rem',
    className: 'transition-colors hover:bg-black/90',
  }}
  cancelLabel="Abort"
  randomLabel="Surprise Me"
  saveLabel="Confirm"
/>
```

### Props (NotionAvatarGenerator)
- `onCancel`: Optional function called when the Cancel button is pressed.
- `onRandom`: Optional function called with the AvatarConfig object and background color when Generate Random is pressed.
- `onSave`: Optional function called with the AvatarConfig object and background color when Save is pressed.
- `actionButtonProps`: Optional object to override style/className for all action buttons (Cancel, Generate, Save). Supports:
  - `className`: string — extra class names for the button
  - `style`: React.CSSProperties — inline style object
  - `background`: string — background color (e.g. `#000`)
  - `color`: string — text color
  - `width`: string or number — button width
  - `fontSize`: string or number — font size
  - `fontWeight`: string or number — font weight
  - `borderRadius`: string or number — border radius
  - `padding`: string — padding (e.g. `0.5rem 1.5rem`)
- `cancelLabel`: Optional string to override the Cancel button label.
- `randomLabel`: Optional string to override the Generate Random button label.
- `saveLabel`: Optional string to override the Save button label.
- `avatarSize`: Optional string to override the avatar size.

---

## Usage: SimpleAvatarGenerator (Minimal)

```jsx
import { SimpleAvatarGenerator } from 'nextjs-notion-avatar';

<SimpleAvatarGenerator
  onCancel={() => { /* handle cancel */ }}
  onRandom={(config, bgColor) => { /* handle random config */ }}
  onSave={(config, bgColor) => { /* handle save config */ }}
  actionButtonProps={{
    background: '#000',
    color: '#fff',
    borderRadius: '0.75rem',
    width: '180px',
    fontSize: '1.125rem',
    fontWeight: 600,
    padding: '0.5rem 1.5rem',
    className: 'transition-colors hover:bg-black/90',
  }}
  cancelLabel="Abort"
  randomLabel="Surprise Me"
  saveLabel="Confirm"
  avatarSize="200px"
/>
```

### Props (SimpleAvatarGenerator)
- `onCancel`: Optional function called when the Cancel button is pressed.
- `onRandom`: Optional function called with the AvatarConfig object and background color when Generate is pressed.
- `onSave`: Optional function called with the AvatarConfig object and background color when Save is pressed.
- `actionButtonProps`: Optional object to override style/className for all action buttons (Cancel, Generate, Save). Same as above.
- `cancelLabel`: Optional string to override the Cancel button label.
- `randomLabel`: Optional string to override the Generate button label.
- `saveLabel`: Optional string to override the Save button label.
- `avatarSize`: Optional string to override the avatar size.

---

## Differences Between Components

| Component                | Avatar Parts | Color Picker | Action Buttons | Portability | Use Case                |
|--------------------------|--------------|--------------|---------------|-------------|-------------------------|
| NotionAvatarGenerator    | Yes          | Yes          | Yes           | High        | Full-featured editor    |
| SimpleAvatarGenerator    | No           | Yes          | Yes           | High        | Minimal, quick preview  |

---

## Example: Custom Avatar Rendering

You can also use the base avatar renderer directly:

```jsx
import NotionAvatar, { getRandomConfig } from 'nextjs-notion-avatar';

const config = getRandomConfig();

<NotionAvatar
  style={{ width: '6rem', height: '6rem' }}
  config={config}
  bgColor="#debaba"
  shape="square"
/>
```

---

## Development & Demo

- Run the Next.js app locally:

```bash
npm install
npm run dev
# or
yarn install && yarn dev
```

- Visit [http://localhost:3000](http://localhost:3000) to use the full-featured editor and test both components.
- The `/templates` page demonstrates both generators side by side.

---

## About the Original Project

<div align="center">
    <h1>React Notion Avatar</h1>
    <img src='https://cdn.jsdelivr.net/gh/zonemeen/static@master/img/example.gif' alt='imagewall' />
    <br/>
</div>

### Assets
- Designer: [@Felix Wong](https://www.producthunt.com/@felix12777) on ProductHunt
- Pack of illustrations: [Noto avatar](https://abstractlab.gumroad.com/l/noto-avatar)

---

## License

Released under [MIT](/LICENSE) by [@zonemeen](https://github.com/zonemeen) and updated by [Joao Pedro Goncalves](https://github.com/JoaoSobral/nextjs-notion-avatar).
