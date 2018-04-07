import { Command } from 'discord-akairo'

import { msgDeleteTime, prefix } from '../config'
import colours from '../colours'

import tags from '../tags'

export default class TagCommand extends Command {
  constructor () {
    super('tags', {
      aliases: ['tags', 'taglist'],
      category: 'assistance',
      description: 'List of Available Tags.',
      cooldown: 1000 * msgDeleteTime,
      ratelimit: 1
    })
  }

  // noinspection JSMethodCanBeStatic
  async exec (message) {
    const fields = []

    for (const [key, val] of Object.entries(tags)) {
      fields.push({name: val.title, value: `${prefix}tag ${key}`})
    }

    if (fields.length === 0) {
      fields.push({
        name: 'No Tags',
        value: 'There are currently no tags added.'
      })
    }

    const sent = await message.util.send({
      embed: {
        title: 'List of Tags',
        color: colours.blue,
        fields,
        author: {
          name: message.member.user.username,
          icon_url: message.member.user.avatarURL
        }
      }
    })
    setTimeout(() => {
      sent.delete(1)
    }, msgDeleteTime * 1000)
  }
}