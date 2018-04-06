import { Command } from 'discord-akairo'

export default class PingCommand extends Command {
  constructor () {
    super('ping', {
      aliases: ['ping'],
      category: 'util',
      description: 'Shows ping and round trip time for the bot.'
    })
  }

  exec (message) {
    return message.util.send('Pong!').then(sent => {
      const timeDiff = (sent.editedAt || sent.createdAt) -
        (message.editedAt || message.createdAt)
      const text = `RTT: ${timeDiff}ms\nHeartbeat: ${Math.round(
        this.client.ping)}ms`
      return message.util.send(`Pong!\n${text}`)
    })
  }
}
