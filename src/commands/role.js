/*
 * Gabe Dunn 2018
 * The file that handles the role command.
 */
import { Command } from 'discord-akairo'

import colours from '../colours'
import { allRoles } from '../approvedRoles'
import { errorMessage } from '../common'

export default class RoleCommand extends Command {
  constructor () {
    super('role', {
      aliases: ['role'],
      category: 'util',
      description: 'Adds or removed roles from a user.',
      args: [
        {
          id: 'command'
        },
        {
          id: 'role',
          match: 'rest'
        }
      ]
    })
  }

  // noinspection JSMethodCanBeStatic
  async exec (message, args) {
    try {
      const guild = message.guild
      if (!args.command) {
        await message.react('❌')
        const embed = errorMessage('No Command Specified', 'You need to' +
          ' specify a command to use.')
        return message.util.send({embed})
      }
      if (!args.role) {
        await message.react('❌')
        const embed = errorMessage('No Role Specified', 'You need to specify' +
          ' a role to use.')
        return message.util.send({embed})
      }
      args.role = args.role.toLowerCase()
      if (!Object.keys(allRoles).includes(args.role)) {
        await message.react('❌')
        const embed = errorMessage('Invalid Role', 'You are not allowed to' +
          ' add or remove that role.')
        return message.util.send({embed})
      }
      const role = guild.roles.find('name', allRoles[args.role])
      if (role === null) {
        await message.react('❌')
        const embed = errorMessage('Role Doesn\'t Exist', 'That role does' +
          ' not exist. Specify a valid role.')
        return message.util.send({embed})
      }
      switch (args.command) {
        case 'add':
          try {
            await message.member.addRole(role)
            await message.delete(1)
            return message.util.send({
              embed: {
                title: 'Role Added',
                color: colours.green,
                description: `Added ${allRoles[args.role]} to ${message.member.user.tag}`,
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
                'Invalid Permission', 'Cannot add roles to that user.'
              )
            })
          }
        case 'rm':
          try {
            await message.member.removeRole(role)
            await message.delete(1)
            return message.util.send({
              embed: {
                title: 'Role Removed',
                color: colours.red,
                description: `Removed ${args.role} from ${message.member.user.tag}`,
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
                'Invalid Permission', 'Cannot remove roles from that user.'
              )
            })
          }
        default:
          await message.react('❌')
          return message.util.send(
            {embed: errorMessage('Wrong Usage', 'That is not a role command.')}
          )
      }
    } catch (e) {
      console.log(`Error sending role message: ${e}`)
      return null
    }
  }
}
