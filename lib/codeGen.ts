import * as htmlToText from 'html-to-text'

import { getTemplate } from './utils'
import { QuestionData } from './client'

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
