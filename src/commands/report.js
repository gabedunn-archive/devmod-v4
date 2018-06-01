/*
 * Gabe Dunn 2018
 * The file that handles the report command.
 */
import { Command } from 'discord-akairo'
import colours from '../colours'

import { errorMessage } from '../common'
import { channels } from '../config'

export default class ReportCommand extends Command {
  constructor () {
    super('report', {
      aliases: ['report'],
      category: 'moderation',
      description: 'Sends a report to the #reports channel.',
      args: [
        {
          id: 'message',
          match: 'rest'
        }
      ],
      channelRestriction: 'guild'
    })
  }

  // noinspection JSMethodCanBeStatic
  async exec (message, args) {
    try {
      if (!args.message) {
        await message.react('❌')
        const embed = errorMessage('Message Not Valid',
          'Please specify a message.')
        return message.util.send({embed})
      }
      await message.delete(1)

      return message.guild.channels.find('name', channels.report).send({
        embed: {
          color: colours.red,
          title: 'New Report',
          description: args.message,
          author: {
            name: message.member.user.username,
            icon_url: message.member.user.avatarURL
          },
          fields: [
            {
              name: 'Channel:',
              value: message.channel.toString(),
              inline: true
            },
            {
              name: 'Member:',
              value: message.member.toString(),
              inline: true
            }
          ],
          footer: {
            icon_url: message.member.user.avatarURL,
            text: `${message.member.user.tag} reported from ${message.channel.name}.`
          },
          timestamp: new Date()
        }
      })
    } catch (e) {
      console.log(`Report command failed: ${e}`)
      return null
    }
  }
}
