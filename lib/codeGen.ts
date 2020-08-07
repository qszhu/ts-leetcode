import * as globby from 'globby'

import { getTemplate, readFileSync } from './utils'

function getType(type: string): string {
  if (type === 'integer') return 'number'
  if (type === 'character') return 'string'
  if (type.match(/(.+)\[\]/) || type.match(/list<(.+)>/)) {
    return `${getType(RegExp.$1)}[]`
  }
  return type
}

function getParams(params: { name: string; type: string }[]): string {
  return params.map(({ name, type }) => `${name}: ${getType(type)}`).join(', ')
}

function getTypeDefaultValue(type: string) {
  if (type === 'string') return "''"
  if (type === 'number') return '0'
  if (type === 'boolean') return 'false'
  if (type.endsWith('[]')) return '[]'
  return 'null'
}

function genFunction(metaData: any) {
  const tmpl = getTemplate('templates/function.hbs')

  const functionName = metaData.name
  const parameters = getParams(metaData.params)
  const returnType = getType(metaData.return.type)
  const defaultReturnValue = getTypeDefaultValue(returnType)

  return tmpl({
    functionName,
    parameters,
    returnType,
    defaultReturnValue,
  })
}

function genClass(metaData: any) {
  const tmpl = getTemplate('templates/class.hbs')

  const className = metaData.classname

  let constructor
  if (metaData.constructor) {
    constructor = {
      params: getParams(metaData.constructor.params),
    }
  }

  const methods = metaData.methods.map((method: any) => {
    const name = method.name
    const params = getParams(method.params)
    const returnType = getType(method.return.type)
    const defaultReturnValue = getTypeDefaultValue(returnType)
    return {
      name,
      params,
      returnType,
      defaultReturnValue,
    }
  })

  return tmpl({
    className,
    constructor,
    methods,
  })
}

const HR = '\n/******************************************************************************/\n\n'

function getSnippets() {
  const snippetFns = globby.sync('templates/snippets/*.ts')
  return snippetFns.map(readFileSync).join(HR)
}

export function genCode(metaData: any) {
  let code
  if (metaData.classname) {
    code = genClass(metaData)
  } else {
    code = genFunction(metaData)
  }
  return `${code}${HR}${getSnippets()}`
}
