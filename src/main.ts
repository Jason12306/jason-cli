import inquirer from 'inquirer'
import { copySync, mkdirSync, rmdirSync } from 'fs-extra'

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

    copySync('templates/template-vue', answers.projectName)
  } catch (error) {
    console.log('\n', error)
    rmdirSync(answers.projectName)
  }
}
