/*
 * Gabe Dunn 2018
 * File that handles adding roles based on reactions.
 */
import Database from 'better-sqlite3'

import { allRolesMap } from './approvedRoles'
import { dbFile } from './config'

const roleAction = async (
  { client, guildId, messageId, userId, emojiName },
  remove = false
) => {
  const db = new Database(dbFile)
  const reactions = db.prepare(
    'SELECT * FROM `settings` WHERE `key` = ? LIMIT 1'
  )

  for (const row of reactions.iterate('reaction_message_ids')) {
    const guild = client.guilds.get(guildId)
    const member = guild.member(userId)
    const roles = guild.roles
    const messageIDs = JSON.parse(row.value)

    if (!messageIDs.includes(messageId)) continue

    for (const reaction of Object.keys(allRolesMap)) {
      const react = allRolesMap[reaction]

      if (emojiName !== react.emoji) continue
      const role = roles.find(r => r.name === reaction)
      if (role !== null) {
        remove ? await member.removeRole(role) : await member.addRole(role)
      }
    }
  }
}

export const roleAdd = async (
  client,
  guildId,
  messageId,
  userId,
  emojiName
) => {
  try {
    const ctx = {
      client,
      guildId,
      messageId,
      userId,
      emojiName
    }
    await roleAction(ctx)
  } catch (e) {
    console.log(`Failed to add role: ${e}`)
  }
}

export const roleRm = async (client, guildId, messageId, userId, emojiName) => {
  try {
    const ctx = {
      client,
      guildId,
      messageId,
      userId,
      emojiName
    }
    await roleAction(ctx, true)
  } catch (e) {
    console.log(`Failed to remove role: ${e}`)
  }
}
