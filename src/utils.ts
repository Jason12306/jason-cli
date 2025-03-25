import { removeSync } from 'fs-extra'
import configs from '../cli.config'

export function getTplByName(name: string) {
  const template = configs.templates.find((tpl) => tpl.name === name)
  if (!template) {
    throw new Error(`Template with name "${name}" not found.`)
  }
  return template
}

export function isUndef(val: unknown) {
  return val === undefined
}

export function isInternalTpl(tpl: Template) {
  return tpl.isInternal || isUndef(tpl.isInternal)
}

export function clearDestDir(path: string) {
  removeSync(path)
}
