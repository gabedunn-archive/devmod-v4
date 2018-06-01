/*
 * Gabe Dunn 2018
 * The file that handles the help command.
 */
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
      args: [
        {
          id: 'member',
          type: 'user'
        }
      ],
      cooldown: 1000 * msgDeleteTime,
      ratelimit: 1
    })
  }

  // noinspection JSMethodCanBeStatic
  async exec (message, args) {
    try {
      // Set fields to be the commands available.
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

      const user = message.member ? message.member.user : message.author

      const embed = {
        title: 'List of Commands',
        color: colours.blue,
        fields,
        author: {
          name: user.username,
          icon_url: user.avatarURL
        }
      }

      if (message.channel.type !== 'dm') {
        await message.delete(1)
        if (!args.member) {
          const sent = await message.util.send({embed})
          return setTimeout(() => {
            sent.delete(1)
          }, msgDeleteTime * 1000)
        } else {
          const member = message.guild.member(args.member.id)
          const dm = await member.createDM()
          return dm.send({embed})
        }
      } else {
        return message.util.send({embed})
      }
    } catch (e) {
      console.log(`Help command failed: ${e}`)
      return null
    }
  }
}
