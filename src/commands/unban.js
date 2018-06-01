/*
 * Gabe Dunn 2018
 * The file that handles the unban command.
 */
import { Command } from 'discord-akairo'
import sqlite from 'sqlite-async'
import colours from '../colours'

import { errorMessage } from '../common'
import { channels, dbFile } from '../config'

export default class UnbanCommand extends Command {
  constructor () {
    super('unban', {
      aliases: ['unban'],
      category: 'moderation',
      description: 'Unbans a user.',
      args: [
        {
          id: 'member'
        },
        {
          id: 'reason',
          match: 'rest',
          default: 'Unbanned via unban command.'
        }
      ],
      clientPermissions: ['BAN_MEMBERS'],
      userPermissions: ['BAN_MEMBERS'],
      channelRestriction: 'guild'
    })
  }

  // noinspection JSMethodCanBeStatic
  async exec (message, args) {
    try {
      if (!args.member) {
        await message.react('❌')
        const embed = errorMessage('Member Not Found',
          'No member found with that name.')
        return message.util.send({embed})
      }
      try {
        let user
        const bannedUsers = await message.guild.fetchBans()
        // Check for user by tag, username, or discrim in banned users list.
        if (bannedUsers.find('tag', args.member) !== null) {
          user = bannedUsers.find('tag', args.member)
        } else if (bannedUsers.find('username', args.member) !== null) {
          user = bannedUsers.find('username', args.member)
        } else if (bannedUsers.get(args.member) !== null) {
          user = bannedUsers.get(args.member)
        }
        if (user === null || user === undefined) {
          await message.react('❌')
          const embed = errorMessage('User not Found', 'That user has not' +
            ' been banned.')
          return message.util.send({embed})
        }
        await message.delete(1)
        try {
          const db = await sqlite.open(dbFile)
          await db.run('DELETE FROM `bans` WHERE `discord_id` = ?', user.id)
          try {
            await message.guild.unban(user, args.reason)
            await user.send({
              embed: {
                title: `You have been unbanned from ${message.guild.name}.`,
                color: colours.green,
                thumbnail: {
                  url: message.guild.iconURL
                },
                fields: [
                  {
                    name: 'Reason:',
                    value: args.reason
                  }],
                footer: {
                  text: `You can now join back with an invite link.`
                }
              }
            })
            return message.guild.channels.find('name', channels.ban).send({
              embed: {
                color: colours.green,
                title: 'Unban',
                description: `${user} has been Unbanned`,
                author: {
                  name: message.member.user.username,
                  icon_url: message.member.user.avatarURL
                },
                fields: [
                  {
                    name: 'Reason:',
                    value: args.reason
                  }],
                footer: {
                  text: `${user.tag} is able to join the server again.`
                },
                timestamp: new Date()
              }
            })
          } catch (e) {
            console.log(`Error unbanning user: ${e}`)
          }
        } catch (e) {
          console.log(`Error deleting user from database: ${e}`)
        }
      } catch (e) {
        console.log(`Couldn't fetch user from banned: ${e}`)
      }
    } catch (e) {
      console.log(`Ban command failed: ${e}`)
      return null
    }
  }
}
