# Jason's CLI Template

## Quickly generate scaffolding through configuration

## Usage

`bun 1.2.5`

```sh
cd jason-cli
bun install
```

## Development

`npm run dev`

## Build

`npm run build`

## Debugging

Click the `Run and Debug` button in VSCode, then select **Dev** or **Build**.

## Configuration (cli.config.ts)

```ts
interface Template {
  name: string // Template name, displayed when selecting
  isInternal?: boolean // Indicates an internal template
  src: string // See details below
}
```

### About `src`

- `isInternal: true`: Points to templates in `src/templates`
- `isInternal: false`: Follows [degit](https://www.npmjs.com/package/degit#usage) conventions

## Notes

For private repositories, ensure you have the necessary permissions to `git clone`.
