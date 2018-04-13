import { Command } from 'discord-akairo'

import colours from '../colours'
import { prefix } from '../config'
import approvedRoles from '../approvedRoles'

export default class RolesCommand extends Command {
  constructor () {
    super('roles', {
      aliases: ['roles'],
      category: 'util',
      description: 'Shows a list of self-assignable roles.'
    })
  }

  // noinspection JSMethodCanBeStatic
  async exec (message, args) {
    try {
      await message.delete(1)
      const guild = message.guild
      const embed = {
        title: 'Available Roles',
        color: colours.blue,
        author: {
          name: message.member.user.username,
          icon_url: message.member.user.avatarURL
        },
        fields: []
      }
      for (const role of guild.roles.array()) {
        if (approvedRoles.includes(role.name)) {
          embed.fields.push({
            name: role.name,
            value: `\`${prefix}role add|rm ${role.name}\``
          })
        }
      }
      if (embed.fields.length <= 0) {
        embed.color = colours.red
        embed.fields = [
          {
            name: 'No (Approved) Roles',
            value: 'There are currently either no approved roles or no roles' +
            ' at all on this server.'
          }
        ]
      }
      return message.util.send({embed})
    } catch (e) {
      console.log(`Error sending roles message: ${e}`)
      return null
    }
  }
}
