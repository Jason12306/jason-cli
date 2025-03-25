# Jason 的 cli 模板

## 通过配置快速生成脚手架

## 使用

`bun 1.2.5`

```sh
cd jason-cli
bun install
```

## 开发

`npm run dev`

## 构建

`npm run build`

## debug

点击 vscode `运行和调试` 按钮，选择 Dev 或 Build

## 配置 (cli.config.ts)

```ts
interface Template {
  name: string // 模板名称，用于选择时展示
  isInternal?: boolean // 是内部模板
  src: string // 见下方
}
```

### 关于`src`

- `isInternal: true` 对应` src/templates` 中的模板
- `isInternal: false` 参考 [degit](https://www.npmjs.com/package/degit#usage)

## 注意

若私有仓库，请确保拥有其权限进行`git clone`
