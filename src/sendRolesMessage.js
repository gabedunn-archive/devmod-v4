/*
 * Gabe Dunn 2018
 * File to send message and add reactions to specified channel.
 */
import discord from 'discord.js'
import sqlite from 'sqlite-async'

import { rolesMessages } from './approvedRoles'
import colours from './colours'
import { botToken, channels, dbFile } from './config'

const client = new discord.Client()

client.on('ready', async () => {
  try {
    console.log(`Logged in as ${client.user.tag}.`)
    const guild = client.guilds.array()[0]
    const messageIDs = []
    let count = 0
    rolesMessages.forEach(async roles => {
      const m = []
      for (const reaction of Object.values(roles.roles)) {
        m.push(`${reaction.name}: ${reaction.emoji}`)
      }
      const message = await guild.channels.find('name', channels.roles).send({
        embed: {
          title: roles.name,
          color: colours.blue,
          description: `${roles.message}\n\n${m.join('\n')}`
        }
      })
      messageIDs.push(message.id)
      for (const reaction of Object.values(roles.roles)) {
        await message.react(reaction.emoji)
      }
      if (++count === rolesMessages.length) {
        finished(messageIDs)
      }
    })
  } catch (e) {
    console.log(`Error sending message: ${e}`)
  }
})

async function finished (messageIDs) {
  await client.destroy()
  const IDsString = JSON.stringify(messageIDs)
  console.log(IDsString)
  try {
    const db = await sqlite.open(dbFile)
    await db.run('CREATE TABLE IF NOT EXISTS settings (' +
      'id INTEGER PRIMARY KEY, ' +
      'key TEXT NOT NULL UNIQUE, ' +
      'value TEXT NOT NULL)')
    await db.run('INSERT OR REPLACE INTO `settings` (`key`, `value`)' +
      ' VALUES (?, ?)', 'reaction_message_ids', IDsString)
  } catch (e) {
    console.log(`Error setting message ID in database: ${e}`)
  }
}

client.login(botToken)
