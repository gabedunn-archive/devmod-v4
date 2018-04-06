import { Command } from 'discord-akairo'

import { msgDeleteTime, prefix } from '../config'
import colours from '../colours'

export default class TagCommand extends Command {
  constructor () {
    super('help', {
      aliases: ['help'],
      category: 'assistance',
      description: 'Sends a list of commands to be used with the bot.'
    })
  }

  // noinspection JSMethodCanBeStatic
  async exec (message) {
    const fields = []

    for (const module of message.client.commandHandler.modules) {
      const name = `${module[0][0].toUpperCase()}${module[0].slice(1)}`
      const command = module[1]

      const category = `${command.category.id[0].toUpperCase()}${
        command.category.id.slice(1)}`

      const args = []

      for (const arg of command.args) {
        args.push(`${arg.id} - ${arg.type}`)
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

    const sent = await message.util.send({
      embed: {
        title: 'List of Commands',
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