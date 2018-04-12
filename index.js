import { AkairoClient } from 'discord-akairo'
import { join } from 'path'
import sqlite from 'sqlite-async'

import { botToken, dbFile, ownerID, prefix, statusInterval } from './src/config'
import activities from './src/activities'

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
  await client.login(botToken)
  console.log(`Logged in as ${client.user.tag}.`)
  client.user.setActivity('.help')

  setInterval(async () => {
    const activity = activities[Math.floor(Math.random() * activities.length)]
    const newActivity = await client.user.setActivity(activity)
    console.log(
      `Set activity to '${newActivity.localPresence.game
        ? newActivity.localPresence.game.name
        : 'nothing'}'.`)
    setTimeout(async () => {
      const newActivity = await client.user.setActivity('.help')
      console.log(
        `Set activity to '${newActivity.localPresence.game
          ? newActivity.localPresence.game.name
          : 'nothing'}'.`)
    }, 60000)
  }, statusInterval * 60000)

  const db = await sqlite.open(dbFile)
  await db.run('CREATE TABLE IF NOT EXISTS warnings (`
    id INTEGER PRIMARY KEY,
    discord_id TEXT NOT NULL,
    reason TEXT NOT NULL,
    date DATE NOT NULL,
    mod_id TEXT NOT NULL
  )`)
  await db.run('CREATE TABLE IF NOT EXISTS points (`
    id INTEGER PRIMARY KEY,
    discord_id TEXT NOT NULL UNIQUE,
    points INTEGER NOT NULL
  )`)
}

run()
