import { dbFile, migrationDir } from '../config'
import Database from 'better-sqlite3'
import fs from 'fs'
import { join } from 'path'

/**
 * Run database schema migrations
 */
module.exports = () => {
  const db = new Database(dbFile)
  const dir = fs.readdirSync(migrationDir).sort()

  for (const migrationFile of dir) {
    db.exec(fs.readFileSync(join(migrationDir, migrationFile), 'utf8'))
  }
}
