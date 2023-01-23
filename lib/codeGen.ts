import * as htmlToText from 'html-to-text'

import { QuestionData } from './client'
import { getTemplate } from './utils'

function getType(type: string): string {
  if (type === 'integer' || type === 'double' || type === 'long') return 'cdouble'
  if (type === 'character') return 'cchar'
  if (type === 'string') return 'cstring'
  if (type === 'boolean') return 'bool'
  if (type.match(/(.+)\[\]/) || type.match(/list<(.+)>/)) {
    return `seq[${getType(RegExp.$1)}]`
  }
  return type
}

function getParams(params: { name: string; type: string }[]): string {
  return params.map(({ name, type }) => `${name}: ${getType(type)}`).join(', ')
}

function getTypeDefaultValue(type: string) {
  if (type === 'cstring') return `""`
  if (type === 'cdouble') return '0'
  if (type === 'bool') return 'false'
  if (type.endsWith('[]')) return '[]'
  return 'nil'
}

function genFunction(metaData: any, questionDesc: string) {
  const tmpl = getTemplate('templates/function.hbs')

  const functionName = metaData.name
  const parameters = getParams(metaData.params)
  const returnType = metaData.return ? getType(metaData.return.type) : 'unknown'
  const defaultReturnValue = getTypeDefaultValue(returnType)

  return tmpl({
    functionName,
    parameters,
    returnType,
    defaultReturnValue,
    questionDesc,
  })
}

function genClass(metaData: any, questionDesc: string) {
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
    questionDesc,
  })
}

function genQuestionDescription(question: QuestionData) {
  const tmpl = getTemplate('templates/question.hbs')

  const title = question.title || question.translatedTitle
  const difficulty = question.difficulty
  const wordwrap = question.content ? 80 : 40
  const content = htmlToText.fromString(question.content || question.translatedContent, {
    wordwrap,
    longWordSplit: { wrapCharacters: [], forceWrapOnLimit: true },
  })

  return tmpl({ title, content, difficulty })
}

export function genCode(question: QuestionData) {
  const metaData = JSON.parse(question.metaData)
  const desc = genQuestionDescription(question)

  if (metaData.classname) {
    return genClass(metaData, desc)
  }
  return genFunction(metaData, desc)
}
