import { rm } from 'node:fs/promises'
import fg from 'fast-glob'
import chalk from 'chalk'
import ora from 'ora'

const outdir = 'dist'

async function bootstrap() {
  const spinner = ora('Start building').start()

  await rm(outdir, { recursive: true, force: true })

  const file = Bun.file('package.json')
  const pkg = await file.json()
  await Bun.write('dist/package.json', file)

  const entrypoints = await fg(['src/**/*.ts'])

  console.log('\nentrypoints', entrypoints)

  const result = await Bun.build({
    entrypoints,
    outdir,
    external: ['figlet'],
    // format: 'esm',
    // target: 'node',
    splitting: true,
    minify: true, // https://github.com/oven-sh/bun/issues/5344
  })

  // console.log(chalk.green('build success!'))
  spinner.succeed(chalk.green('Building completed!'))
}

bootstrap()

function test() {
  const spinner = ora('Start building').start()

  setTimeout(() => {
    spinner.color = 'yellow'
    spinner.text = 'Loading rainbows'
  }, 1000)
}

// test()
