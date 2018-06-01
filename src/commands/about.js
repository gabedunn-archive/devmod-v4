/*
* Gabe Dunn 2018
* File that handles the about command.
*/

import { Command } from 'discord-akairo'
import colours from '../colours'
import { msgDeleteTime } from '../config'

export default class PingCommand extends Command {
  constructor () {
    super('about', {
      aliases: ['about'],
      category: 'util',
      description: 'Tells a little bit about the bot.',
      cooldown: 1000 * msgDeleteTime,
      ratelimit: 1
    })
  }

  // noinspection JSMethodCanBeStatic
  async exec (message) {
    try {
      await message.delete(1)
      const user = message.member ? message.member.user : message.author
      return message.util.send({
        embed: {
          title: 'DevMod - About the Bot',
          color: colours.blue,
          url: 'https://github.com/redxtech/devmod',
          description: 'DevMod is a bot made for the DevCord community, but' +
          ' is applicable to any server that needs moderating. It is written' +
          ' with discord-akairo and discord.js. To use it on your own' +
          ' server, follow the steps in the GitHub repo.',
          fields: [
            {
              name: 'Author:',
              value: '<@170451883134156800>',
              inline: true
            },
            {
              name: 'GitHub Repo:',
              value: 'https://github.com/redxtech/devmod',
              inline: true
            }
          ],
          author: {
            name: user.username,
            icon_url: user.avatarURL
          },
          timestamp: new Date()
        }
      })
    } catch (e) {
      console.log(`Error sending about message: ${e}`)
      return null
    }
  }
}
