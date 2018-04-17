import discord from 'discord.js'
import sqlite from 'sqlite-async'

import { reactionRolesMap } from './approvedRoles'
import { botToken, channels, dbFile } from './config'

const client = new discord.Client()

client.on('ready', async () => {
  try {
    console.log(`Logged in as ${client.user.tag}.`)
    const guild = client.guilds.array()[0]
    const m = []
    for (const reaction of Object.values(reactionRolesMap)) {
      m.push(`${reaction.name}: ${reaction.emoji}`)
    }
    const message = await guild.channels.find('name', channels.roles).send(
      'To add a role, react to this message with one of the specified' +
      ' emojis:\n' + m.join('\n')
    )
    for (const reaction of Object.values(reactionRolesMap)) {
      await message.react(reaction.emoji)
    }
    try {

      const db = await sqlite.open(dbFile)
      await db.run('CREATE TABLE IF NOT EXISTS settings (' +
        'id INTEGER PRIMARY KEY, ' +
        'key TEXT NOT NULL UNIQUE, ' +
        'value TEXT NOT NULL)')
      await db.run('INSERT OR REPLACE INTO `settings` (`key`, `value`) VALUES' +
        ' (?, ?)', 'reaction_message_id', message.id)
      await client.destroy()
    } catch (e) {
      console.log(`Error setting message key in database: ${e}`)
    }
  } catch (e) {
    console.log(`Error sending message: ${e}`)
  }
})

client.login(botToken)
