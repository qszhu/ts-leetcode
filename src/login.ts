import { prompt } from 'enquirer'

import { Client } from '../lib/client'

export async function login(client: Client) {
  const { username, password } = await prompt([
    {
      type: 'input',
      name: 'username',
      message: 'Username:',
    },
    {
      type: 'password',
      name: 'password',
      message: 'Password:',
    },
  ])
  console.log('Logging in, this may take some time...')
  await client.loginWithPassword(username, password)
  console.log('Success!')
}
