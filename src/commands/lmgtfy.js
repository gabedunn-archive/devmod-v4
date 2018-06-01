/*
 * Gabe Dunn 2018
 * The file that handles the lmgtfy command.
 */
import { Command } from 'discord-akairo'
import colours from '../colours'
import { errorMessage } from '../common'

export default class LMGTFYCommand extends Command {
  constructor () {
    super('lmgtfy', {
      aliases: ['lmgtfy'],
      category: 'assistance',
      description: 'Sends a LMGTFY link with the specified query.',
      args: [
        {
          id: 'query',
          match: 'rest'
        }
      ]
    })
  }

  // noinspection JSMethodCanBeStatic
  async exec (message, args) {
    try {
      if (!args.query) {
        await message.react('❌')
        return message.util.send({
          embed: errorMessage(
            'No Query Specified', 'You need to specify a query.'
          )
        })
      }
      await message.delete(1)
      return message.util.send({
        embed: {
          title: 'LMGTFY',
          color: colours.blue,
          url: `https://lmgtfy.com/?q=${args.query.replace(/\s/g, '+')}`,
          description: 'Here you go!',
          author: {
            name: message.member.user.username,
            icon_url: message.member.user.avatarURL
          }
        }
      })
    } catch (e) {
      console.log(`Error sending initial message: ${e}`)
      return null
    }
  }
}
