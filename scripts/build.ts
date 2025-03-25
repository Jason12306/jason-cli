import { removeSync, copy } from 'fs-extra'
import fg from 'fast-glob'
import chalk from 'chalk'
import ora from 'ora'

const outdir = 'dist'

async function bootstrap() {
  const spinner = ora('Start building').start()

  removeSync(outdir)

  await Promise.all([
    copy('package.json', `${outdir}/package.json`),
    copy('templates', `${outdir}/templates`),
  ])

  const entrypoints = await fg(['src/**/*.ts', 'cli.config.ts'])

  console.log('\nentrypoints', entrypoints)

  const result = await Bun.build({
    entrypoints,
    outdir,
    external: ['figlet'],
    target: 'node',
    splitting: true,
    minify: true, // https://github.com/oven-sh/bun/issues/5344
  })

  spinner.succeed(chalk.green('Building completed!'))
}

bootstrap()
