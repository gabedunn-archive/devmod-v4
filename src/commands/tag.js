/*
 * Gabe Dunn 2018
 * The file that handles the tag command.
 */
import { Command } from 'discord-akairo'

import { errorMessage } from '../common'
import tags from '../tags'

export default class TagCommand extends Command {
  constructor () {
    super('tag', {
      aliases: ['tag'],
      category: 'assistance',
      description: 'Sends a preset text when called.',
      args: [
        {
          id: 'tag'
        },
        {
          id: 'member',
          type: 'user'
        }
      ]
    })
  }

  // noinspection JSMethodCanBeStatic
  async exec (message, args) {
    try {
      let embed
      if (tags.hasOwnProperty(args.tag.toLowerCase())) {
        embed = tags[args.tag.toLowerCase()]
        if (message.channel.type !== 'dm') {
          await message.delete(1)
        }
      } else {
        embed = errorMessage('Tag Not Found', 'No tag with that name exists.')
        await message.react('❌')
      }
      const user = message.member ? message.member.user : message.author
      embed.author = {
        name: user.username,
        icon_url: user.avatarURL
      }
      if (message.channel.type === 'dm') {
        return message.util.send({embed})
      } else if (args.member) {
        return message.util.send(args.member, {embed})
      } else {
        return message.util.send({embed})
      }
    } catch (e) {
      console.log(`Tag command failed: ${e}`)
      return null
    }
  }
}
