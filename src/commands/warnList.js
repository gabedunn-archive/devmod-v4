/*
 * Gabe Dunn 2018
 * The file that handles the warnlist command.
 */
import { Command } from 'discord-akairo'
import sqlite from 'sqlite-async'
import colours from '../colours'

import { errorMessage } from '../common'
import { dbFile } from '../config'

export default class ListWarnsCommand extends Command {
  constructor () {
    super('warnlist', {
      aliases: ['warnlist', 'warns'],
      category: 'moderation',
      description: 'Lists warnings of a user.',
      args: [
        {
          id: 'member',
          type: 'member'
        }
      ],
      clientPermissions: ['KICK_MEMBERS'],
      userPermissions: ['KICK_MEMBERS'],
      channelRestriction: 'guild'
    })
  }

  // noinspection JSMethodCanBeStatic
  async exec (message, args) {
    try {
      if (!args.member) {
        await message.react('❌')
        const embed = errorMessage(
          'Member Not Found', 'No member found with' +
          ' that name.')
        return message.util.send({embed})
      }

      await message.delete(1)

      try {
        const user = args.member.user
        const db = await sqlite.open(dbFile)
        const embed = {
          title: `Warnings for ${user.tag}`,
          color: colours.blue,
          fields: [],
          author: {
            name: message.member.user.username,
            icon_url: message.member.user.avatarURL
          }
        }
        let count = 0
        let warnings = []
        await db.each('SELECT * FROM `warnings` WHERE `discord_id` = ?',
          user.id,
          (err, row) => {
            if (!err) {
              warnings.push(row)
              count++
            }
          })
        if (count <= 0) {
          embed.fields.push({
            name: `Warnings: ${count}`,
            value: 'No warnings found'
          })
        } else {
          for (let i = 0; i < count; ++i) {
            let warning = warnings[i]
            let date = new Date(warning.date)
            let day = '0' + date.getDate()
            let month = '0' + (date.getMonth() + 1)
            let year = date.getFullYear()

            let mod = message.guild.member(warning.mod_id)
            let modName = mod == null
              ? ('unknown (' + warning.mod_id + ')')
              : (mod.user.tag)

            embed.fields.push({
              name: `Warning ${(i + 1)} (${day.substr(-2)}.${month.substr(
                -2)}.${year})`,
              value: `"${warning.reason}" by ${modName}`
            })
          }
        }
        return message.util.send({embed})
      } catch (e) {
        console.log(`Error accessing database: ${e}`)
      }
    } catch (e) {
      console.log(`Warnlist command failed: ${e}`)
      return null
    }
  }
}
