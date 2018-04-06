import { AkairoClient } from 'discord-akairo'
import { join } from 'path'

import { botToken, ownerID, prefix } from './src/config'

const client = new AkairoClient({
  ownerID,
  prefix,
  allowMention: true,
  handleEdits: true,
  commandUtil: true,
  commandUtilLifetime: 600000,
  commandDirectory: join(__dirname, 'src', 'commands')
  // inhibitorDirectory: join(__dirname, 'src', 'inhibitors')
  // listenerDirectory: join(__dirname, 'src', 'listeners')
})

const run = async () => {
  await client.login(botToken)
  console.log(`Logged in as ${client.user.tag}.`)
}

run()