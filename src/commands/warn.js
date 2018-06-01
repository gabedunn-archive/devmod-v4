/*
 * Gabe Dunn 2018
 * The file that handles the warn command.
 */
import { Command } from 'discord-akairo'
import sqlite from 'sqlite-async'
import colours from '../colours'

import { errorMessage } from '../common'
import {
  autoBan,
  autoBanWarns,
  banMsgDelete,
  channels,
  dbFile
} from '../config'

export default class WarnCommand extends Command {
  constructor () {
    super('warn', {
      aliases: ['warn'],
      category: 'moderation',
      description: 'Warns a user, and bans them if the maximum warns has' +
      ' been exceeded',
      args: [
        {
          id: 'member',
          type: 'member'
        },
        {
          id: 'reason',
          match: 'rest'
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
        const embed = errorMessage('No Member Specified', 'You didn\'t' +
          ' specify a member.')
        return message.util.send({embed})
      }
      if (!args.reason) {
        await message.react('❌')
        const embed = errorMessage('Reason Not Specified', 'Please specify a' +
          ' reason for the warning.')
        return message.util.send({embed})
      }
      if (args.member.permissions.has('KICK_MEMBERS')) {
        await message.react('❌')
        const embed = errorMessage('Can\'t Warn Member', 'You are not allowed' +
          ' to warn that member.')
        return message.util.send({embed})
      }

      await message.delete(1)

      const user = args.member.user
      const reason = args.reason
      const executor = message.member.user

      try {
        // Add warning into database & check numbers of previous warnings.
        // Ban user if configs says to do so & warns is over limit.
        const db = await sqlite.open(dbFile)
        await db.run('INSERT INTO `warnings` (`discord_id`, `reason`, `date`,' +
          ' `mod_id`) VALUES (?, ?, ?, ?)', user.id, reason, new Date(),
        executor.id)
        return db.each('SELECT COUNT(`id`) AS `count` FROM `warnings` WHERE' +
          ' `discord_id` = ?', user.id, async (err, row) => {
          if (!err) {
            let color = colours.yellow
            if (row.count === 2) {
              color = colours.orange
            } else if (row.count >= 3) {
              color = colours.red
            }
            await message.guild.channels.find('name', channels.warn).send({
              embed: {
                title: `Warning #${row.count}.`,
                color,
                author: {
                  name: executor.username,
                  icon_url: executor.avatarURL
                },
                description: `${user} has been warned for ${reason}.`,
                footer: {
                  icon_url: user.avatarURL,
                  text: `${user.tag} has been warned.`
                }
              }
            })
            await user.send({
              embed: {
                title: `You have received a warning on ${message.guild.name}.`,
                color,
                thumbnail: {
                  url: message.guild.iconURL
                },
                fields: [
                  {
                    name: 'Reason:',
                    value: reason
                  }
                ]
              }
            })
            if (autoBan && row.count >= autoBanWarns) {
              await user.send({
                embed: {
                  title: `You have been banned from ${message.guild.name}.`,
                  color,
                  thumbnail: {
                    url: message.guild.iconURL
                  },
                  fields: [
                    {
                      name: `Reason: ${reason} (${row.count} warnings).`,
                      value: `Your messages from the past ${banMsgDelete} days have been deleted.`
                    }
                  ]
                }
              })
              await args.member.ban({
                days: banMsgDelete,
                reason: `${row.count} warnings! Most recent: ${reason}.`
              })
              await db.run('DELETE FROM `warnings` WHERE `discord_id` = ?',
                user.id)
              await message.guild.channels.find('name', channels.ban).send({
                embed: {
                  title: 'Auto Ban',
                  color,
                  description: `${user} has been banned. (Maximum warnings exceeded (${autoBanWarns}))`,
                  author: {
                    name: message.client.user.username,
                    icon_url: message.client.user.avatarURL
                  },
                  fields: [
                    {
                      name: 'Reason:',
                      value: reason
                    }
                  ],
                  footer: {
                    icon_url: user.avatarURL,
                    text: `${user.tag} banned. Messages from past ${banMsgDelete} days deleted.`
                  },
                  timestamp: new Date()
                }
              })
            }
          }
        })
      } catch (e) {
        console.log(`Error accessing database: ${e}`)
      }
    } catch (e) {
      console.log(`Warn command failed: ${e}`)
      return null
    }
  }
}
