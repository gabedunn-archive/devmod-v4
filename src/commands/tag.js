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
      ],
      channelRestriction: 'guild'
    })
  }

  // noinspection JSMethodCanBeStatic
  async exec (message, args) {
    try {
      let embed
      try {
        if (tags.hasOwnProperty(args.tag.toLowerCase())) {
          embed = tags[args.tag.toLowerCase()]
          await message.delete(1)
        } else {
          embed = errorMessage('Tag Not Found', 'No tag with that name exists.')
          await message.react('❌')
        }
      } catch (e) {
        console.log(`Error selecting tag: ${e}`)
        return null
      }
      try {
        embed.author = {
          name: message.member.user.username,
          icon_url: message.member.user.avatarURL
        }
        if (args.member) {
          return message.util.send(args.member, {embed})
        } else {
          return message.util.send({embed})
        }
      } catch (e) {
        console.log(`Error sending tag: ${e}`)
        return null
      }
    } catch (e) {
      console.log(`Tag command failed: ${e}`)
      console.log(`Line Number: ${e.lineNumber}`)
      return null
    }
  }
}