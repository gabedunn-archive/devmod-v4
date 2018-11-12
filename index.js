/*
 * Gabe Dunn 2018
 * Main file that calls all other files and specifies actions.
 */
import { AkairoClient } from 'discord-akairo'
import { join } from 'path'

import { botToken, dbFile, ownerID, prefix, statusInterval } from './src/config'
import activities from './src/activities'
import { roleAdd, roleRm } from './src/reactionRoles'
import { migrate } from './src/utils'

const client = new AkairoClient({
  ownerID,
  prefix,
  allowMention: true,
  handleEdits: true,
  commandUtil: true,
  commandUtilLifetime: 600000,
  commandDirectory: join(__dirname, 'src', 'commands')
})

const run = async () => {
  try {
    await client.login(botToken)
    console.log(`Logged in as ${client.user.tag}.`)
    client.user.setActivity('.help')

    setInterval(async () => {
      const activity = activities[Math.floor(Math.random() * activities.length)]
      const newActivity = await client.user.setActivity(activity)
      setTimeout(async () => {
        await client.user.setActivity('.help')
      }, 60000)
    }, statusInterval * 60000)

    client.on('raw', async event => {
      try {
        const { d: data } = event
        if (event.t === 'MESSAGE_REACTION_ADD') {
          roleAdd(
            client,
            data.guild_id,
            data.message_id,
            data.user_id,
            data.emoji.name
          )
        } else if (event.t === 'MESSAGE_REACTION_REMOVE') {
          roleRm(
            client,
            data.guild_id,
            data.message_id,
            data.user_id,
            data.emoji.name
          )
        }
      } catch (e) {
        console.log(`Error handling reaction: ${e}`)
      }
    })

    // Create schema
    await migrate()
  } catch (e) {
    console.log(`Error running bot: ${e}`)
  }
}

run()

process.on('uncaughtException', (e, p) => {
  console.log(`Uncaught Exception: ${e} && ${p}`)
  client.destroy()
  process.exit(1)
})
