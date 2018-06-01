/*
 * Gabe Dunn 2018
 * The file that handles the users command.
 */
import { Command } from 'discord-akairo'

import colours from '../colours'

export default class UsersCommand extends Command {
  constructor () {
    super('users', {
      aliases: ['users'],
      category: 'util',
      description: 'Shows how many users are on the server.'
    })
  }

  // noinspection JSMethodCanBeStatic
  async exec (message, args) {
    try {
      await message.delete(1)
      const guild = message.guild
      return message.util.send({
        embed: {
          title: 'Users',
          color: colours.blue,
          description: `There are currently ${guild.memberCount
          } users in this discord. (${guild.members.array().filter(
            m => m.presence.status !== 'offline').length} currently online).`,
          author: {
            name: message.member.user.username,
            icon_url: message.member.user.avatarURL
          }
        }
      })
    } catch (e) {
      console.log(`Error sending users message: ${e}`)
      return null
    }
  }
}
