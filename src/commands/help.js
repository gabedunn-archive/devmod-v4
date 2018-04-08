import { Command } from 'discord-akairo'

import { msgDeleteTime, prefix } from '../config'
import { capitalize } from '../common'
import colours from '../colours'

export default class TagCommand extends Command {
  constructor () {
    super('help', {
      aliases: ['help'],
      category: 'assistance',
      description: 'Sends a list of commands to be used with the bot.',
      cooldown: 1000 * msgDeleteTime,
      ratelimit: 1
    })
  }

  // noinspection JSMethodCanBeStatic
  async exec (message) {
    const fields = []

    for (const module of message.client.commandHandler.modules) {
      const name = capitalize(module[0])
      const command = module[1]

      const category = capitalize(command.category.id)

      const args = []

      for (const arg of command.args) {
        args.push(`${arg.id}`)
      }

      const usage = args.length === 0
        ? `\`${prefix}${command.aliases[0]}\``
        : `\`${prefix}${command.aliases[0]} <${args.join('> <')}>\``

      fields.push({
        name,
        value: `Usage: ${usage}\nCategory: ${category}\n${command.description}`
      })
    }

    if (fields.length === 0) {
      fields.push({
        name: 'No Commands',
        value: 'There are currently no commands to use.'
      })
    }

    const embed = {
      title: 'List of Commands',
      color: colours.blue,
      fields
    }

    if (message.channel.type !== 'dm') {
      await message.delete(1)
      embed.author = {
        name: message.member.user.username,
        icon_url: message.member.user.avatarURL
      }
      const sent = await message.util.send({embed})
      return setTimeout(() => {
        sent.delete(1)
      }, msgDeleteTime * 1000)
    } else {
      return message.util.send({embed})
    }
  }
}