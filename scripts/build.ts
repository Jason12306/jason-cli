import { rm } from 'node:fs/promises'
import fg from 'fast-glob'

const outdir = 'dist'

async function bootstrap() {
  await rm(outdir, { recursive: true, force: true })

  const file = Bun.file('package.json')
  const pkg = await file.json()
  await Bun.write('dist/package.json', file)

  const result = await Bun.build({
    entrypoints: await fg(['src/main.ts', 'src/**/*.ts']),
    outdir,
    external: ['*'],
    format: 'esm',
    target: 'node',
  })
}

bootstrap()
