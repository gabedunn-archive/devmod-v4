/*
 * Gabe Dunn 2018
 * The file that handles the gbp command.
 *
 * TODO: XD rewrite pls, modularize a bit,
 */
import { Command } from 'discord-akairo'
import Database from 'better-sqlite3'
import colours from '../colours'

import { errorMessage } from '../common'
import { dbFile, msgDeleteTime, pointEmoji, pointsTopCount } from '../config'

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
        const embed = errorMessage(
          'No Command Specified',
          'You need to' + ' specify a command to use.'
        )
        return message.util.send({ embed })
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
        const db = new Database(dbFile)

        const boye =
          message.guild.emojis.find(e => e.name === pointEmoji) || ':)'
        let count, points, newPoints, stmt, row
        // Switch for different commands based on args.
        switch (args.command) {
          case 'top':
            const topUsers = []
            count = 0

            stmt = db.prepare(
              'SELECT * FROM points ORDER BY points DESC LIMIT ?'
            )

            for (const row of stmt.iterate(pointsTopCount)) {
              const member = message.guild.member(row.discord_id)

              if (member !== null) {
                const { user } = member
                topUsers.push({
                  name: `#${++count}: ${user.tag}.`,
                  value: `${row.points} GBP ${boye}`
                })
              }
            }

            if (count === 0) {
              embed.description = 'No users have GBP yet.'
            }
            embed.fields = topUsers
            await message.delete(1)
            return message.util.send({ embed })
          case 'bottom':
            const bottomUsers = []

            // todo: just ew..
            count = db.prepare('SELECT COUNT(*) AS cnt FROM points').get().cnt

            if (count === 0) {
              embed.description = 'No users have GBP yet.'
            } else {
              stmt = db.prepare(
                'SELECT * FROM points ORDER BY points ASC LIMIT ?'
              )

              for (const row of stmt.iterate(pointsTopCount)) {
                const member = message.guild.member(row.discord_id)
                if (member !== null) {
                  const { user } = member
                  bottomUsers.push({
                    name: `#${count--}: ${user.tag}.`,
                    value: `${row.points} GBP ${boye}`
                  })
                }
              }
            }

            embed.fields = bottomUsers
            await message.delete(1)
            return message.util.send({ embed })
          case 'show':
            if (!args.member) {
              await message.react('❌')
              const embed = errorMessage(
                'Member Not Found',
                'No member found with that name.'
              )
              return message.util.send({ embed })
            }
            const { user } = message.guild.member(args.member.id)
            if (user === null) {
              await message.react('❌')
              return message.util.send({
                embed: errorMessage(
                  'Member Not Found',
                  'No member found with that name.'
                )
              })
            }

            const res = db
              .prepare('SELECT points as gbp FROM points WHERE discord_id = ?')
              .get(args.member.user.id)

            const gbp = res ? res.gbp : 0

            embed.description = `${args.member} has ${gbp} GBP ${boye}`
            await message.delete(1)
            return message.util.send({ embed })
          case 'add':
            if (!message.member.permissions.has('KICK_MEMBERS')) {
              await message.react('❌')
              return message.util.send({
                embed: errorMessage(
                  'No Permission',
                  'You are not allowed to use that command.'
                )
              })
            }

            row = db
              .prepare('SELECT `points` FROM `points` WHERE `discord_id` = ?')
              .get(args.member.user.id)
            points = row && row.points

            newPoints = (points | 0) + args.points
            db.prepare(
              'INSERT OR REPLACE INTO `points` (`discord_id`, `points`) VALUES (?, ?)'
            ).run(args.member.user.id, newPoints)

            embed.description = `${
              args.member
            } now has  ${newPoints} GBP ${boye}`
            await message.delete(1)
            return message.util.send({ embed })
          case 'rm':
            if (!message.member.permissions.has('KICK_MEMBERS')) {
              await message.react('❌')
              return message.util.send({
                embed: errorMessage(
                  'No Permission',
                  'You are not allowed to use that command.'
                )
              })
            }

            row = db
              .prepare('SELECT `points` FROM `points` WHERE `discord_id` = ?')
              .get(args.member.user.id)

            newPoints = ((row && row.points) | 0) - args.points
            db.prepare(
              'INSERT OR REPLACE INTO `points` (`discord_id`, `points`) VALUES (?, ?)'
            ).run(args.member.user.id, newPoints)

            embed.color = colours.red
            embed.description = `${
              args.member
            } now has  ${newPoints} GBP ${boye}`
            await message.delete(1)
            return message.util.send({ embed })
          case 'set':
            if (!message.member.permissions.has('KICK_MEMBERS')) {
              await message.react('❌')
              return message.util.send({
                embed: errorMessage(
                  'No Permission',
                  'You are not allowed to use that command.'
                )
              })
            }
            db.prepare(
              'INSERT OR REPLACE INTO `points` (`discord_id`,' +
                ' `points`) VALUES (?, ?)'
            ).run(args.member.user.id, args.points)
            embed.color = colours.blue
            embed.description = `${args.member} now has  ${
              args.points
            } GBP ${boye}`
            await message.delete(1)
            return message.util.send({ embed })
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
                value:
                  "Show a user's GBPs. If no user is specified, self is used."
              },
              {
                name: '.gbp add <user> [<points> (default 1)]',
                value: 'Adds specified points to a user.'
              },
              {
                name: '.gbp rm <user> [<points> (default 1)]',
                value: 'Remove specified points from a user.'
              }
            ]
            embed.color = colours.blue
            const helpMsg = await message.channel.send({ embed })
            await message.delete(1)
            return setTimeout(() => {
              helpMsg.delete(1)
            }, msgDeleteTime * 1000)
          default:
            await message.react('❌')
            return message.util.send({
              embed: errorMessage('Wrong Usage', 'That is not a GBP command.')
            })
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
