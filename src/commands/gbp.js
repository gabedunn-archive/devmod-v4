/*
 * Gabe Dunn 2018
 * The file that handles the gbp command.
 */
import { Command } from 'discord-akairo'
import sqlite from 'sqlite-async'
import colours from '../colours'

import { errorMessage } from '../common'
import {
  dbFile,
  msgDeleteTime,
  pointEmoji,
  pointsTopCount
} from '../config'

export default class GBPCommand extends Command {
  constructor () {
    super('gbp', {
      aliases: ['gbp'],
      category: 'fun',
      description: 'Operations involving GBP.',
      args: [
        {
          id: 'command'
        },
        {
          id: 'member',
          type: 'member',
          default: message => message.member
        },
        {
          id: 'points',
          type: 'integer',
          default: 1
        }
      ],
      channelRestriction: 'guild'
    })
  }

  // noinspection JSMethodCanBeStatic
  async exec (message, args) {
    try {
      if (!args.command) {
        await message.react('❌')
        const embed = errorMessage('No Command Specified', 'You need to' +
          ' specify a command to use.')
        return message.util.send({embed})
      }
      const embed = {
        title: 'Good Boye Points',
        color: colours.green,
        author: {
          name: message.member.user.username,
          icon_url: message.member.user.avatarURL
        }
      }
      try {
        const db = await sqlite.open(dbFile)
        const boye = message.guild.emojis.find('name', pointEmoji)
          ? message.guild.emojis.find('name', pointEmoji)
          : ':)'
        let count, points, newPoints
        // Switch for different commands based on args.
        switch (args.command) {
          case 'top':
            const topUsers = []
            count = 0
            await db.each(
              'SELECT * FROM `points` ORDER BY `points` DESC LIMIT ?',
              pointsTopCount, (err, row) => {
                if (!err) {
                  const member = message.guild.member(row.discord_id)
                  if (member !== null) {
                    const {user} = member
                    topUsers.push({
                      name: `#${++count}: ${user.tag}.`,
                      value: `${row.points} GBP ${boye}`
                    })
                  }
                }
              })
            if (count === 0) {
              embed.description = 'No users have GBP yet.'
            }
            embed.fields = topUsers
            await message.delete(1)
            return message.util.send({embed})
          case 'bottom':
            const bottomUsers = []
            let users = 0
            count = 0
            await db.each('SELECT COUNT(*) AS `count` FROM `points`',
              (err, row) => {
                if (!err) {
                  users = row.count
                }
              })
            await db.each('SELECT * FROM `points` ORDER BY' +
              ' `points` ASC LIMIT ?', pointsTopCount, (err, row) => {
              if (!err) {
                const member = message.guild.member(row.discord_id)
                if (member !== null) {
                  const {user} = member
                  bottomUsers.push({
                    name: `#${users - ++count}: ${user.tag}.`,
                    value: `${row.points} GBP ${boye}`
                  })
                }
              }
            })
            if (count === 0) {
              embed.description = 'No users have GBP yet.'
            }
            embed.fields = bottomUsers
            await message.delete(1)
            return message.util.send({embed})
          case 'show':
            if (!args.member) {
              await message.react('❌')
              const embed = errorMessage('Member Not Found',
                'No member found with that name.')
              return message.util.send({embed})
            }
            const {user} = message.guild.member(args.member.id)
            if (user === null) {
              await message.react('❌')
              return message.util.send({
                embed: errorMessage('Member Not Found',
                  'No member found with that name.')
              })
            }
            let gbp
            await db.each(
              'SELECT `points` FROM `points` WHERE `discord_id` = ?',
              args.member.user.id, (err, row) => {
                if (!err) {
                  gbp = row.points
                }
              })
            if (gbp === undefined) {
              gbp = 0
            }
            embed.description = `${args.member} has ${gbp} GBP ${boye}`
            await message.delete(1)
            return message.util.send({embed})
          case 'add':
            if (!message.member.permissions.has('KICK_MEMBERS')) {
              await message.react('❌')
              return message.util.send({
                embed: errorMessage('No Permission',
                  'You are not allowed to use that command.')
              })
            }
            points = 0
            await db.each(
              'SELECT `points` FROM `points` WHERE `discord_id` = ?',
              args.member.user.id, (err, row) => {
                if (!err) {
                  points = row.points
                }
              })
            newPoints = points + (args.points)
            await db.run('INSERT OR REPLACE INTO `points` (`discord_id`,' +
              ' `points`) VALUES' +
              ' (?, ?)', args.member.user.id, newPoints)
            embed.description = `${args.member} now has  ${newPoints} GBP ${boye}`
            await message.delete(1)
            return message.util.send({embed})
          case 'rm':
            if (!message.member.permissions.has('KICK_MEMBERS')) {
              await message.react('❌')
              return message.util.send({
                embed: errorMessage('No Permission',
                  'You are not allowed to use that command.')
              })
            }
            points = 0
            await db.each(
              'SELECT `points` FROM `points` WHERE `discord_id` = ?',
              args.member.user.id, (err, row) => {
                if (!err) {
                  points = row.points
                }
              })
            newPoints = points - args.points
            await db.run('INSERT OR REPLACE INTO `points` (`discord_id`,' +
              ' `points`) VALUES' +
              ' (?, ?)', args.member.user.id, newPoints)
            embed.color = colours.red
            embed.description = `${args.member} now has  ${newPoints} GBP ${boye}`
            await message.delete(1)
            return message.util.send({embed})
          case 'set':
            if (!message.member.permissions.has('KICK_MEMBERS')) {
              await message.react('❌')
              return message.util.send({
                embed: errorMessage('No Permission',
                  'You are not allowed to use that command.')
              })
            }
            await db.run('INSERT OR REPLACE INTO `points` (`discord_id`,' +
              ' `points`) VALUES (?, ?)', args.member.user.id, args.points)
            embed.color = colours.blue
            embed.description = `${args.member} now has  ${args.points} GBP ${boye}`
            await message.delete(1)
            return message.util.send({embed})
          case 'help':
            embed.fields = [
              {
                name: '.gbp help',
                value: 'Show this message.'
              },
              {
                name: '.gbp top',
                value: 'Show 3 users with most GBPs.'
              },
              {
                name: '.gbp bottom',
                value: 'Show 3 users with least GBPs.'
              },
              {
                name: '.gbp show [<user>]',
                value: 'Show a user\'s GBPs. If no user is specified, self is used.'
              },
              {
                name: '.gbp add <user> [<points> (default 1)]',
                value: 'Adds specified points to a user.'
              },
              {
                name: '.gbp rm <user> [<points> (default 1)]',
                value: 'Remove specified points from a user.'
              }]
            embed.color = colours.blue
            const helpMsg = await message.channel.send({embed})
            await message.delete(1)
            return setTimeout(() => {
              helpMsg.delete(1)
            }, msgDeleteTime * 1000)
          default:
            await message.react('❌')
            return message.util.send(
              {embed: errorMessage('Wrong Usage', 'That is not a GBP command.')}
            )
        }
      } catch (e) {
        console.log(`Error accessing database: ${e}`)
      }
    } catch (e) {
      console.log(`GBP command failed: ${e}`)
      return null
    }
  }
}
