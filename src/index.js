require('dotenv').config()
import { AkairoClient } from 'discord-akairo'

const client = new AkairoClient()

client.login(process.env.BOT_TOKEN)