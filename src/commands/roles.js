/*
 * Gabe Dunn 2018
 * The file that handles the roles command.
 */
import { Command } from 'discord-akairo'

import colours from '../colours'
import { msgDeleteTime, prefix } from '../config'
import { allRoles } from '../approvedRoles'

export default class RolesCommand extends Command {
  constructor () {
    super('roles', {
      aliases: ['roles'],
      category: 'util',
      description: 'Shows a list of self-assignable roles.',
      cooldown: 1000 * msgDeleteTime,
      ratelimit: 1
    })
  }

  // noinspection JSMethodCanBeStatic
  async exec (message) {
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
        if (Object.values(allRoles).includes(role.name)) {
          embed.fields.push({
            name: role.name,
            value: `\`${prefix}role add ${role.name}\` | \`${prefix}role rm ${role.name}\``
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
      const sent = await message.util.send({embed})
      return setTimeout(() => {
        sent.delete(1)
      }, msgDeleteTime * 1000)
    } catch (e) {
      console.log(`Error sending roles message: ${e}`)
      return null
    }
  }
}
