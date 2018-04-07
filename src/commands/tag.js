import { Command } from 'discord-akairo'

import colours from '../colours'
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
          type: 'member'
        }
      ]
    })
  }

  // noinspection JSMethodCanBeStatic
  async exec (message, args) {
    let embed
    if (tags.hasOwnProperty(args.tag.toLowerCase())) {
      await message.delete(1)
      embed = tags[args.tag.toLowerCase()]
    } else {
      embed = errorMessage('Tag Not Found', 'No tag with that name exists.')
      message.react('❌')
    }
    embed.author = {
      name: message.member.user.username,
      icon_url: message.member.user.avatarURL
    }
    if (args.member) {
      return message.util.send(args.member, {embed})
    } else {
      return message.util.send({embed})
    }
  }
}