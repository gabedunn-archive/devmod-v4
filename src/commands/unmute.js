/*
 * Gabe Dunn 2018
 * The file that handles the unmute command.
 */
import { Command } from 'discord-akairo'

import colours from '../colours'
import { errorMessage } from '../common'
import { mutedRole } from '../config'

export default class RoleCommand extends Command {
  constructor () {
    super('unmute', {
      aliases: ['unmute'],
      category: 'moderator',
      description: 'Removes muted role to user.',
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
      const guild = message.guild
      if (!args.member) {
        await message.react('❌')
        const embed = errorMessage('No Member Specified', 'You need to' +
          ' specify a member to unmute.')
        return message.util.send({embed})
      }
      const role = guild.roles.find('name', mutedRole)
      if (role === null) {
        await message.react('❌')
        const embed = errorMessage('Role Doesn\'t Exist', 'That role does' +
          ' not exist. Add a valid muted role.')
        return message.util.send({embed})
      }
      try {
        await args.member.removeRole(role)
        await message.delete(1)
        return message.util.send({
          embed: {
            title: 'Member Unmuted',
            color: colours.orange,
            description: `Unmuted ${args.member.user.tag}`,
            author: {
              name: message.member.user.username,
              icon_url: message.member.user.avatarURL
            }
          }
        })
      } catch (e) {
        await message.react('❌')
        return message.util.send({
          embed: errorMessage(
            'Invalid Permission', 'Cannot unmute that user.'
          )
        })
      }
    } catch (e) {
      console.log(`Error unmuting user: ${e}`)
      return null
    }
  }
}
