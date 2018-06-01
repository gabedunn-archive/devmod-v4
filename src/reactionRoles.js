/*
 * Gabe Dunn 2018
 * File that handles adding roles based on reactions.
 */
import sqlite from 'sqlite-async'

import { allRolesMap } from './approvedRoles'
import { dbFile } from './config'

export const roleAdd = async (
  client, guildId, messageId, userId, emojiName) => {
  try {
    const db = await sqlite.open(dbFile)
    await db.each('SELECT * FROM `settings` WHERE `key` = ? LIMIT 1',
      'reaction_message_ids', async (err, row) => {
        if (!err) {
          const guild = client.guilds.get(guildId)
          const member = guild.member(userId)
          const roles = guild.roles
          const messageIDs = JSON.parse(row.value)
          if (messageIDs.includes(messageId)) {
            for (const reaction of Object.values(allRolesMap)) {
              if (emojiName === reaction.emoji) {
                const role = roles.find('name', reaction.name)
                if (role !== null) {
                  await member.addRole(role)
                }
              }
            }
          }
        }
      })
  } catch (e) {
    console.log(`Failed to add role: ${e}`)
  }
}

export const roleRm = async (client, guildId, messageId, userId, emojiName) => {
  try {
    const db = await sqlite.open(dbFile)
    await db.each('SELECT * FROM `settings` WHERE `key` = ? LIMIT 1',
      'reaction_message_ids', async (err, row) => {
        if (!err) {
          const guild = client.guilds.get(guildId)
          const member = guild.member(userId)
          const roles = guild.roles
          const messageIDs = JSON.parse(row.value)
          if (messageIDs.includes(messageId)) {
            for (const reaction of Object.values(allRolesMap)) {
              if (emojiName === reaction.emoji) {
                const role = roles.find('name', reaction.name)
                if (role !== null) {
                  await member.removeRole(role)
                }
              }
            }
          }
        }
      })
  } catch (e) {
    console.log(`Failed to remove role: ${e}`)
  }
}
