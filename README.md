# Next.js Notion Avatar (Fork & Update)

**This project is a fork and update of the original [react-notion-avatar](https://github.com/zonemeen/react-notion-avatar) (MIT, 2021) by [zonemeen](https://github.com/zonemeen).**

This fork and update is maintained by **Joao Pedro Goncalves** ([GitHub](https://github.com/JoaoSobral/nextjs-notion-avatar)), **(MIT, 2025).**

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

Import and use the NotionAvatarGenerator component:

```jsx
import { NotionAvatarGenerator } from 'nextjs-notion-avatar';

<NotionAvatarGenerator
  onCancel={() => { /* handle cancel */ }}
  onRandom={(config) => { /* handle random config */ }}
  onSave={(config) => { /* handle save config */ }}
/>
```

---

## Getting Started (Next.js App)

First, run the development server:

```bash
npm install
npm run dev
# or
yarn install && yarn dev
# or
pnpm install && pnpm dev
# or
bun install && bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

---
## NEW Features

### NotionAvatarGenerator Component

A fully-featured avatar generator for Notion-style avatars, designed for use in Next.js and React projects.

**Features:**
- Interactive avatar part selection (face, eyes, hair, etc.)
- Color picker for background
- Random avatar generation
- Save/cancel actions with callback support
- SSR-safe (no hydration issues)

### Usage

```jsx
import { NotionAvatarGenerator } from 'nextjs-notion-avatar';

<NotionAvatarGenerator
  onCancel={() => { /* handle cancel */ }}
  onRandom={(config) => { /* handle random config */ }}
  onSave={(config) => { /* handle save config */ }}
/>
```

### Props
- `onCancel`: Optional function called when the Cancel button is pressed.
- `onRandom`: Optional function called with the config string when Generate Random is pressed.
- `onSave`: Optional function called with the config string when Save is pressed.

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

### Usage in NextJS

1. Import the component.
   ```js
   import NotionAvatar, { getRandomConfig } from 'nextjs-notion-avatar'
   ```
2. Set the required config attribute, so that you can always render the same avatar with the configuration.
   ```js
   const config = {
     eye: 3,
     eyebrow: 3,
     face: 4,
     glass: 1,
     hair: 1,
     mouth: 2,
     nose: 3,
     accessory: 0,
     beard: 0,
     detail: 0,
   }
   // or generate a random config
   const config = getRandomConfig()
   ```
3. Render the component with specific width / height and configuration.
   ```jsx
   <NotionAvatar style={{ width: '6rem', height: '6rem' }} config={config} />
   // or
   <NotionAvatar
     className="className"
     bgColor="#debaba"
     shape="square"
     config={config}
   />
   ```

### Attributes

The Attributes can be passed into config:

| key         | type   | default | accept |
| ----------- | ------ | ------- | ------ |
| `face`      | number |         | 0~11   |
| `eye`       | number |         | 0~14   |
| `eyebrow`   | number |         | 0~16   |
| `glass`     | number |         | 0~13   |
| `hair`      | number |         | 0~58   |
| `mouth`     | number |         | 0~20   |
| `nose`      | number |         | 0~14   |
| `accessory` | number | 0       | 0~13   |
| `beard`     | number | 0       | 0~17   |
| `detail`    | number | 0       | 0~14   |

Or as React props:

| key         | type   | default  | options                              | tips                 |
| ----------- | ------ | -------- | ------------------------------------ | -------------------- |
| `className` | string |          |                                      | Only for React Props |
| `style`     | object |          |                                      | Only for React Props |
| `shape`     | string | 'circle' | 'circle' , 'rounded' , 'square'      | Only for React Props |
| `bgColor`   | string |          | Hexadecimal , RGB , HSL , Predefined | Only for React Props |


## License

Released under [MIT](/LICENSE) by [@zonemeen](https://github.com/zonemeen) and updated by [Joao Pedro Goncalves](https://github.com/JoaoSobral/nextjs-notion-avatar).
