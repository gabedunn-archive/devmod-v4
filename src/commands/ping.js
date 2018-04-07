import { Command } from 'discord-akairo'
import colours from '../colours'

export default class PingCommand extends Command {
  constructor () {
    super('ping', {
      aliases: ['ping'],
      category: 'util',
      description: 'Shows ping and round trip time for the bot.'
    })
  }

  async exec (message) {
    const embed = {
      title: 'Pong!',
      color: colours.blue
    }
    const sent = await message.util.send({embed})
    const timeDiff = (sent.editedAt || sent.createdAt) -
      (message.editedAt || message.createdAt)
    embed.fields = [
      {
        name: 'Round Trip Time:',
        value: `${timeDiff}ms.`
      },
      {
        name: 'Ping:',
        value: `${Math.round(this.client.ping)}ms.`
      }
    ]
    return message.util.send({embed})
  }
}
