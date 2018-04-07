import { Command } from 'discord-akairo'
import sqlite from 'sqlite-async'
import colours from '../colours'

import { errorMessage } from '../common'
import { channels, dbFile } from '../config'

export default class BanCommand extends Command {
  constructor () {
    super('ban', {
      aliases: ['ban'],
      category: 'moderation',
      description: 'Bans a user.',
      args: [
        {
          id: 'member',
          type: 'member'
        },
        {
          id: 'reason',
          match: 'rest'
        },
        {
          id: 'rm',
          match: 'flag',
          prefix: '--rm'
        }
      ],
      clientPermissions: ['BAN_MEMBERS'],
      userPermissions: ['BAN_MEMBERS'],
      channelRestriction: 'guild'
    })
  }

  // TODO: add proper try/catch for error handling
  // noinspection JSMethodCanBeStatic
  async exec (message, args) {
    if (!args.member) {
      await message.react('❌')
      const embed = errorMessage('Member Not Found', 'No member found with' +
        ' that name.')
      return message.util.send({embed})
    }
    if (!args.reason) {
      await message.react('❌')
      const embed = errorMessage('Reason Not Specified', 'Please specify a' +
        ' reason for the ban.')
      return message.util.send({embed})
    }
    if (args.member.permissions.has('KICK_MEMBERS')) {
      await message.react('❌')
      const embed = errorMessage('Can\'t Ban Member', 'You are not allowed' +
        ' to ban that member.')
      return message.util.send({embed})
    }

    await message.delete(1)

    const user = args.member.user

    const time = args.rm ? 7 : 0

    await user.send({
      embed: {
        title: `You have been banned from ${message.guild.name}.`,
        color: colours.red,
        thumbnail: {
          url: message.guild.iconURL
        },
        fields: [
          {
            name: 'Reason:',
            value: args.reason
          }],
        footer: {
          text: `Your messages from the past ${time} days have been deleted.`
        }
      }
    })
    message.guild.channels.find('name', channels.ban).send({
      embed: {
        color: colours.red,
        title: 'Ban',
        description: 'User has been banned',
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
          icon_url: user.avatarURL,
          text: `${user.tag}'s messages from the past ${time} days have been deleted.`
        },
        timestamp: new Date()
      }
    })
    await args.member.ban({
      days: time,
      reason: args.reason
    })

    const db = await sqlite.open(dbFile)
    return db.run('DELETE FROM `warnings` WHERE `discord_id` = ?', user.id)
  }
}
