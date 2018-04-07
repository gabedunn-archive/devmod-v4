import { AkairoClient } from 'discord-akairo'
import { join } from 'path'
import sqlite from 'sqlite-async'

import { botToken, dbFile, ownerID, prefix } from './src/config'

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

  const db = await sqlite.open(dbFile)
  await db.run('CREATE TABLE IF NOT EXISTS warnings (' +
    'id INTEGER PRIMARY KEY, ' +
    'discord_id TEXT NOT NULL,' +
    'reason TEXT NOT NULL,' +
    '`date` DATE NOT NULL,' +
    'mod_id TEXT NOT NULL)')
  await db.run('CREATE TABLE IF NOT EXISTS points (' +
    'id INTEGER PRIMARY KEY, ' +
    'discord_id TEXT NOT NULL UNIQUE, ' +
    'points INTEGER NOT NULL)')
  // await db.close()
}

client.on('error', error => {
  console.log(error)
})

run()