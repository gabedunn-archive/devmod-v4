/*
 * Gabe Dunn 2018
 * The file that handles the stats command.
 */
import { Command } from 'discord-akairo'
import moment from 'moment'

import colours from '../colours'

export default class StatsCommand extends Command {
  constructor () {
    super('stats', {
      aliases: ['stats', 'statistics'],
      category: 'util',
      description: 'Shows some statistics about the server.'
    })
  }

  // noinspection JSMethodCanBeStatic
  async exec (message) {
    try {
      const guild = message.guild
      const client = message.client
      const uptime = moment.duration(client.uptime)
      await message.delete(1)
      return message.util.send({
        embed: {
          title: 'Server Stats',
          color: colours.blue,
          author: {
            name: message.member.user.username,
            icon_url: message.member.user.avatarURL
          },
          fields: [
            {
              name: guild.name,
              value: `Members: ${guild.memberCount}\n` +
              `Server was created at: ${moment(guild.createdAt)
                .format('YYYY/M/D')}\n` +
              `Num. of channels: ${guild.channels.array()
                .filter(channel => channel.type !== 'category').length}\n` +
              `Region: ${guild.region}\n` +
              `AFK Timeout: ${guild.afkTimeout}s\n`
            },
            {
              name: 'Bot Information',
              value: `Uptime: ${uptime.hours()} hours, ${uptime.minutes()} mins, ${uptime.seconds()}s`
            }
          ]
        }
      })
    } catch (e) {
      console.log(`Error sending stats message: ${e}`)
      return null
    }
  }
}
