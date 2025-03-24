import inquirer from 'inquirer'
import { copySync, mkdirSync, rmdirSync } from 'fs-extra'
import path, { resolve } from 'node:path'

export async function run() {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'Please enter the project name',
    },
    {
      type: 'list',
      name: 'selectedTpl',
      message: 'Please select a project template',
      choices: ['vue2', 'vue3', 'react'],
    },
  ])
  try {
    console.log('\n', answers)

    mkdirSync(answers.projectName)

    copySync(
      path.resolve('templates', 'template-vue'),
      path.resolve(answers.projectName)
    )
  } catch (error) {
    console.log('\n', error)
    rmdirSync(path.resolve(answers.projectName))
  }
}
