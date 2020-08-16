import axios from 'axios'
import * as puppeteer from 'puppeteer-core'

import Config from './config'

const SESSION_COOKIE_NAME = 'LEETCODE_SESSION'

function toCookieString(cookieObj: Record<string, unknown>) {
  return Object.keys(cookieObj)
    .map((key) => `${key}=${cookieObj[key]}`)
    .join('; ')
}

export interface QuestionDataResp {
  data: {
    question: {
      questionId: string
      title: string
      titleSlug: string
      content: string
      difficulty: string
      sampleTestCase: string
      metaData: string
      judgerAvailable: boolean
      judgeType: string
    }
  }
}

interface InterpretResp {
  interpret_id: string
  interpret_expected_id: string
}

interface SubmitResp {
  submission_id: string
}

interface CheckResp {
  status_code?: number
  lang: string
  run_success: boolean
  status_runtime: string
  memory: number
  elapsed_time: number
  task_finish_time: number
  task_name: string
  status_msg: string
  state: string
  fast_submit: boolean
  total_correct: number
  total_testcases: number
  submission_id: string
  runtime_percentile: number
  status_memory: string
  memory_percentile: number
  pretty_lang: string
}

export interface CheckInterpretResp extends CheckResp {
  code_answer: string[]
  code_output: string[]
}

export interface CheckSubmissionResp extends CheckResp {
  question_id: string
  compare_result: string
  code_output: string
  std_output: string
  last_testcase: string
}

export class Client {
  private config: Config

  constructor(
    private session?: string,
    private host = 'https://leetcode-cn.com',
    private checkResultInterval = 1000
  ) {
    this.config = Config.load()
    if (!this.session) {
      this.session = this.config.leetcodeSession
    }
  }

  async loginWithPassword(username: string, password: string) {
    const browser = await puppeteer.launch({
      slowMo: 100,
      executablePath: this.config.browserPath,
    })

    const page = await browser.newPage()
    await page.goto(this.host)

    // crucial: remove webdriver property
    await page.evaluate(() => {
      Object.defineProperty(navigator, 'webdriver', {
        get: () => false,
      })
    })

    // click "sign in with password"
    const signInWithPasswordSel = 'div[data-cypress=sign-in-with-password]'
    await page.waitForSelector(signInWithPasswordSel)
    await page.click(signInWithPasswordSel)

    // type username
    const usernameSel = 'input[autocomplete=username]'
    await page.waitForSelector(usernameSel)
    await page.type(usernameSel, username, { delay: 250 })

    // type password
    const passwordSel = 'input[autocomplete=password]'
    await page.waitForSelector(passwordSel)
    await page.type(passwordSel, password, { delay: 250 })

    // click login button
    const loginSel = 'button[type=submit]'
    await page.waitForSelector(loginSel)
    await page.click(loginSel)

    await page.waitForNavigation()
    const cookies = await page.cookies()
    await browser.close()

    let session = null
    for (const cookie of cookies) {
      if (cookie.name === SESSION_COOKIE_NAME) {
        session = cookie.value
        break
      }
    }

    if (!session) throw new Error('session cookie not found')
    this.config.leetcodeSession = session
  }

  private get cookie() {
    const cookies: any = {}
    cookies[SESSION_COOKIE_NAME] = this.session
    return toCookieString(cookies)
  }

  async getQuestionData(titleSlug: string): Promise<QuestionDataResp> {
    const method = 'post'
    const url = `${this.host}/graphql/`
    const referer = `${this.host}/problemset/all/`
    const headers = {
      Cookie: this.cookie,
      Referer: referer,
    }
    const data = {
      operationName: 'questionData',
      query: [
        'query questionData($titleSlug: String!) {',
        '  question(titleSlug: $titleSlug) {',
        '    questionId',
        '    title',
        '    titleSlug',
        '    content',
        '    difficulty',
        '    sampleTestCase',
        '    metaData',
        '    judgerAvailable',
        '    judgeType',
        '  }',
        '}',
      ].join('\n'),
      variables: {
        titleSlug,
      },
    }
    const res = await axios.request({
      method,
      url,
      headers,
      data,
    })
    return res.data
  }

  async interpret(
    titleSlug: string,
    questionId: string,
    sourceCode: string,
    testData: string,
    judgeType: string,
    lang = 'javascript'
  ): Promise<InterpretResp> {
    const method = 'post'
    const url = `${this.host}/problems/${titleSlug}/interpret_solution/`
    const referer = `${this.host}/problems/${titleSlug}/submissions/`
    const headers = {
      Cookie: this.cookie,
      Referer: referer,
    }
    const data = {
      lang,
      data_input: testData,
      judge_type: judgeType,
      question_id: questionId,
      test_judger: '',
      test_mode: false,
      typed_code: sourceCode,
    }
    const res = await axios.request({
      method,
      url,
      headers,
      data,
    })
    return res.data
  }

  async submit(
    titleSlug: string,
    questionId: string,
    sourceCode: string,
    lang = 'javascript'
  ): Promise<SubmitResp> {
    const method = 'post'
    const url = `${this.host}/problems/${titleSlug}/submit/`
    const referer = `${this.host}/problems/${titleSlug}/submissions/`
    const headers = {
      Cookie: this.cookie,
      Referer: referer,
    }
    const data = {
      lang,
      question_id: questionId,
      questionSlug: titleSlug,
      test_judger: '',
      test_mode: false,
      typed_code: sourceCode,
    }
    const res = await axios.request({
      method,
      url,
      headers,
      data,
    })
    return res.data
  }

  async checkInterpret(titleSlug: string, interpretId: string): Promise<CheckInterpretResp> {
    const method = 'get'
    const url = `${this.host}/submissions/detail/${interpretId}/check/`
    const referer = `${this.host}/problems/${titleSlug}/submissions/`
    const headers = {
      Cookie: this.cookie,
      Referer: referer,
    }
    const res = await axios.request({
      method,
      url,
      headers,
    })
    return res.data
  }

  // TODO: DRY
  async checkSubmission(titleSlug: string, submissionId: string): Promise<CheckSubmissionResp> {
    const method = 'get'
    const url = `${this.host}/submissions/detail/${submissionId}/check/`
    const referer = `${this.host}/problems/${titleSlug}/submissions/`
    const headers = {
      Cookie: this.cookie,
      Referer: referer,
    }
    const res = await axios.request({
      method,
      url,
      headers,
    })
    return res.data
  }

  // TODO: DRY
  async waitInterpretResult(titleSlug: string, submissionId: string): Promise<CheckInterpretResp> {
    let res = await this.checkInterpret(titleSlug, submissionId)
    if (!res.hasOwnProperty('status_code')) {
      console.log(res.state)
      res = await new Promise((resolve) => {
        setTimeout(async () => {
          const res = await this.waitInterpretResult(titleSlug, submissionId)
          resolve(res)
        }, this.checkResultInterval)
      })
    }
    return res
  }

  async waitSubmissionResult(
    titleSlug: string,
    submissionId: string
  ): Promise<CheckSubmissionResp> {
    let res = await this.checkSubmission(titleSlug, submissionId)
    if (!res.hasOwnProperty('status_code')) {
      console.log(res.state)
      res = await new Promise((resolve) => {
        setTimeout(async () => {
          const res = await this.waitSubmissionResult(titleSlug, submissionId)
          resolve(res)
        }, this.checkResultInterval)
      })
    }
    return res
  }
}
