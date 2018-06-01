/*
 * Gabe Dunn 2018
 * The file that handles the prune command.
 */
import { Command } from 'discord-akairo'

export default class PruneCommand extends Command {
  constructor () {
    super('prune', {
      aliases: ['prune'],
      category: 'util',
      description: 'Deletes last x messages.',
      args: [
        {
          id: 'amount',
          type: 'integer',
          default: 5
        }
      ],
      clientPermissions: ['MANAGE_MESSAGES'],
      userPermissions: ['MANAGE_MESSAGES']
    })
  }

  // noinspection JSMethodCanBeStatic
  async exec (message, args) {
    try {
      const amount = args.amount > 50 ? 50 : args.amount
      await message.delete(1)
      const messages = await message.channel.fetchMessages({limit: amount})
      return messages.deleteAll()
    } catch (e) {
      console.log(`Error deleting messages: ${e}`)
      return null
    }
  }
}
