import inquirer from 'inquirer'
import { copySync, mkdirSync, rmdirSync } from 'fs-extra'
import path, { resolve } from 'node:path'
import degit from 'degit'
import configs from './config'
import { getTplByName, isUndef } from './utils'

interface Answers {
  projectName: string
  selectedTpl: string
}

function createProjectDir(answers: Answers) {
  mkdirSync(answers.projectName)
}

function createTemplate(answers: Answers) {
  const dest = path.resolve(answers.projectName)

  const selectedTpl = getTplByName(answers.selectedTpl)

  if (selectedTpl.isInternal || isUndef(selectedTpl.isInternal)) {
    copySync(path.resolve('templates', selectedTpl.src), dest)
  } else {
  }
}

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
      choices: configs.templates.map((tpl) => tpl.name),
    },
  ])
  try {
    console.log('\n', answers)

    createProjectDir(answers)
    createTemplate(answers)
  } catch (error) {
    console.log('\n', error)
    rmdirSync(path.resolve(answers.projectName))
  }
}

function test() {
  const emitter = degit('Jason12306/jason12306', {
    mode: 'git',
  })

  emitter.on('info', (info) => {
    console.log('info ====>>>', info.message)
  })

  emitter.on('warn', (info) => {
    console.log('warn ====>>>', info.message)
  })

  emitter.clone('zzz1').then((value) => {
    console.log('done', value)
  })
}
