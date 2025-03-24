import configs from './config'

export function getTplByName(name: string) {
  const template = configs.templates.find((tpl) => tpl.name === name)
  if (!template) {
    throw new Error(`Template with name "${name}" not found.`)
  }
  return template
}

export function isUndef(val: any) {
  return val === undefined
}
