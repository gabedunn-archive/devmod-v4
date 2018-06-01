/*
 * Gabe Dunn 2018
 * The file that handles the clearWarns command.
 */
import { Command } from 'discord-akairo'
import sqlite from 'sqlite-async'
import colours from '../colours'

import { errorMessage } from '../common'
import { dbFile } from '../config'

export default class ClearWarnsCommand extends Command {
  constructor () {
    super('clearwarns', {
      aliases: ['clearwarns', 'cwarns'],
      category: 'moderation',
      description: 'Clears warning from a user.',
      args: [
        {
          id: 'member',
          type: 'member'
        },
        {
          id: 'amount',
          default: '*'
        }
      ],
      clientPermissions: ['KICK_MEMBERS'],
      userPermissions: ['KICK_MEMBERS'],
      channelRestriction: 'guild'
    })
  }

  // noinspection JSMethodCanBeStatic
  async exec (message, args) {
    try {
      if (!args.member) {
        await message.react('❌')
        const embed = errorMessage('Member Not Found',
          'No member found with that name.')
        return message.util.send({embed})
      }

      // Set amount to number or * based on args.
      let amount
      if (args.amount !== '*' && isNaN(Number(args.amount))) {
        amount = 1
      } else if (args.amount === '*') {
        amount = '*'
      } else {
        amount = Number(args.amount)
      }

      if (amount < 1) {
        await message.react('❌')
        const embed = errorMessage('Invalid Number',
          'The number of warns to delete must be at least 1.')
        return message.util.send({embed})
      }
      await message.delete(1)

      const reply = async () => {
        let desc, desc2
        if (amount === '*') {
          desc = 'Warnings'
          desc2 = 'have'
        } else if (amount === 1) {
          desc = `${amount} warning`
          desc2 = 'has'
        } else {
          desc = `${amount} warnings`
          desc2 = 'have'
        }
        return message.util.send({
          embed: {
            color: colours.green,
            title: 'Removed Warnings',
            author: {
              name: message.member.user.username,
              icon_url: message.member.user.avatarURL
            },
            description: `${desc} ${desc2} been removed from ${args.member}.`,
            timestamp: new Date()
          }
        })
      }
      // Delete warnings from database based on amount arg
      try {
        const db = await sqlite.open(dbFile)
        if (amount === '*') {
          await db.run('DELETE FROM `warnings` WHERE `discord_id` = ?',
            args.member.user.id)
          return reply()
        } else {
          await db.run(
            'DELETE FROM `warnings` WHERE `id` IN (SELECT `id` FROM `warnings` WHERE `discord_id` = ? ORDER BY `id` DESC LIMIT ?)',
            args.member.user.id, amount)
          return reply()
        }
      } catch (e) {
        console.log(`Error setting reply: ${e}`)
        return null
      }
    } catch (e) {
      console.log(`Clear Warns command failed: ${e}`)
      return null
    }
  }
}
