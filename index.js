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

    const db = await sqlite.open(dbFile)
    await db.run('CREATE TABLE IF NOT EXISTS warnings (' +
      'id INTEGER PRIMARY KEY, ' +
      'discord_id TEXT NOT NULL,' +
      'reason TEXT NOT NULL,' +
      '`date` DATE NOT NULL,' +
      'mod_id TEXT NOT NULL)')
    await db.run('CREATE TABLE IF NOT EXISTS bans (' +
      'id INTEGER PRIMARY KEY, ' +
      'discord_id TEXT NOT NULL,' +
      'discord_name TEXT NOT NULL, ' +
      'reason TEXT NOT NULL,' +
      '`date` DATE NOT NULL,' +
      'mod_id TEXT NOT NULL)')
    await db.run('CREATE TABLE IF NOT EXISTS points (' +
      'id INTEGER PRIMARY KEY, ' +
      'discord_id TEXT NOT NULL UNIQUE, ' +
      'points INTEGER NOT NULL)')
    await db.run('CREATE TABLE IF NOT EXISTS settings (' +
      'id INTEGER PRIMARY KEY, ' +
      'key TEXT NOT NULL UNIQUE, ' +
      'value TEXT NOT NULL)')
  } catch (e) {
    console.log(`Error running bot: ${e}`)
  }
}

run()