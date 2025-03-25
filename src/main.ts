import inquirer from 'inquirer'
import { copySync, existsSync } from 'fs-extra'
import path from 'node:path'
import degit from 'degit'
import configs from '../cli.config'
import { clearDestDir, getTplByName, isInternalTpl } from './utils'
import ora from 'ora'

async function createProjectDir(answers: { projectName: string }) {
  if (existsSync(answers.projectName)) {
    const result = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'isOverride',
        message: 'The project already exists, do you want to override it?',
      },
    ])
    return result
  } else {
  }
}

async function createTemplate(answers: {
  projectName: string
  selectedTpl: string
}) {
  const dest = path.resolve(answers.projectName)

  const selectedTpl = getTplByName(answers.selectedTpl)

  if (isInternalTpl(selectedTpl)) {
    copySync(path.resolve('templates', selectedTpl.src), dest)
  } else {
    // Is remote template
    const emitter = degit(selectedTpl.src, {
      mode: 'git',
    })

    emitter.on('info', (info) => {
      console.log('\n', info.message)
    })

    emitter.on('warn', (info) => {
      console.log('\n', info.message)
    })

    await emitter.clone(dest)
  }
}

export async function run() {
  const projectNameAnswers = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'Please enter the project name',
    },
  ])

  try {
    const result = await createProjectDir(projectNameAnswers)

    if (!result || result.isOverride) {
      const selectedTplAnswers = await inquirer.prompt([
        {
          type: 'list',
          name: 'selectedTpl',
          message: 'Please select a project template',
          choices: configs.templates.map((tpl) => tpl.name),
        },
      ])

      const spinner = ora('Is Creating the project').start()
      // Override the project
      clearDestDir(projectNameAnswers.projectName)

      await createTemplate({
        ...selectedTplAnswers,
        projectName: projectNameAnswers.projectName,
      })
      spinner.succeed('Project created successfully')
    } else {
      // nothing to do
    }
  } catch (error) {
    console.log('\n', error)
    clearDestDir(projectNameAnswers.projectName)
    // spinner.stop()
    process.exit()
  }
}
