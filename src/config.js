import dotenv from 'dotenv'
import { join } from 'path'

dotenv.config()

export const botToken = process.env.BOT_TOKEN
export const ownerID = process.env.OWNER_ID
export const prefix = process.env.PREFIX
export const msgDeleteTime = process.env.MSG_DELETE_TIME
export const dbFile = join(__dirname, '..', process.env.DB_FILE)
export const autoBan = process.env.AUTOBAN
export const autoBanWarns = process.env.AUTOBAN_WARNS
export const banMsgDelete = process.env.BAN_MSG_DELETE
export const channels = {
  warn: process.env.CHANNEL_LOG_WARN,
  ban: process.env.CHANNEL_LOG_BAN,
  report: process.env.CHANNEL_REPORT,
  roles: process.env.CHANNEL_ROLES
}
export const pointEmoji = process.env.POINTS_EMOJI
export const statusInterval = process.env.STATUS_INTERVAL
export const pointsTopCount = process.env.POINTS_TOP_COUNT