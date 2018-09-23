# DevMod

> A Discord bot for moderating servers.

This was originally made to moderate the DevCord Discord community, but you
don't need to be a developer to use it.

## Setup

### Step 1 - Creating the Bot User

First, go to the
[Discord Developers](https://discordapp.com/developers/applications/me)
page and create a new app. Name the app and give it a profile picture as you
please. Afterwards, navigate to the "Bot" section. Click on "Add Bot" under the
"Build-a-Bot" subsection. A popup will appear asking you to confirm the action.
Once you confirm the action, the bot section will expand and you will be able to
obtain your token under the "Token" section. This token will allow your bot to
log in to Discord.

### Step 2 - Inviting the Bot to your Server

Navigate to the "OAuth2" section and head to the "OAuth2 URL Generator"
subsection. Under the "Scopes" section, click on "bot". A new section, titled
"Bot Permissions", will appear. Select "Administrator. This will allow the bot
to see all of the channels, ban users, etc. Afterwards, look at the "Scopes"
section. At the bottom, there is a URL contained within a field. Copy and paste
the URL into a new browser tab. A list of servers in which you have
administrator permissions will appear. After choosing a server and clicking
"Authorize", the bot will join the selected server.

### Step 3 - Setting Up the Host Machine

Because the bot run on [node](https://nodejs.org), you must have it installed
on your host machine. If you are familar with git, clone the DevMod repo using
`git clone`. Else, download the repo as a zip and unpack it to any folder of
your choosing. Open up the command line and `cd` into the folder that contains
the cloned/unzipped code.

Run `npm install` to install all of the bot's dependencies and then `npm install
-g pm2` to be able to run the bot in the background. The host machine is now
configured to run the bot. All you need to do now is set up the config.

### Step 4 - Configuring the bot

This part is easy. Just type in `npm run env` and it will ask you some
questions.

Option | Default | Description
---|---|---
`BOT_TOKEN` | | The token you got from creating the bot user.
`OWNER_ID` | | Your [Discord ID](https://goo.gl/fTsqkq).
`PREFIX` | `.` | The prefix to start off all bot commands.
`MSG_DELETE_TIME` | `10` | The amount of seconds before deleting the help commands.
`DB_FILE` | `devmod.sqlite` | The name of the database file for warnings and points.
`AUTOBAN` | `true` | Whether or not to automatically ban a user after hitting the maximum amount of warnings.
`AUTOBAN_WARNS` | `3` | The number warnings are needed to autoban a user.
`BAN_MSG_DELETE` | `0` | The number of days of a user's messages to delete after being banned.
`CHANNEL_LOG_WARN` | `warnings` | The name of the channel to log warnings.
`CHANNEL_LOG_BAN` | `bans` | The name of the channel to log bans.
`CHANNEL_LOG_REPORT` | `reports` | The name of the channel to log reports.
`POINTS_EMOJI` | `boye` | The name of the server specific emoji to append to Good Boye Points.
`STATUS_INTERVAL` | `5` | The amount of minutes between changing the bot's status.
`POINTS_TOP_COUNT` | `10` | The amount of users to show in Good Boye Points top and bottom commands.

Afterwards, open up `src/approvedRoles.js`. Add role names that you would like
members to be able to assign to themselves via the role command. This is case
sensitive, so be sure to get it 100% accurate.

### Step 5 - Running the Bot

Now that you have all of the options set up, you can run the bot. If you want to
run it on your computer while keeping the command line window open, use the
command `npm run start`.

If you want to run the bot in the background without needing to keep a command
line window open, use the command `pm2 start devmod.js`.

Now the bot is ready for use!

> Just a quick note - the tags in `src/tags.js`, the activities in
`src/activities.js`, and the roles in `src/approvedRoles.js` may not be specific
to all servers, so make sure to check those out before running the bot.

## Features & Usage

> This overview assumes that all config options are set to their defaults.

### Warning Users

If a user has a role that allows them to kick users, they can use the
warns system.

`.warn <user> <reason>` will send a DM to the user with their warning, send a
message to the channel specified in `CHANNEL_LOG_WARN`, and adds the warning to
the database file along with the ID of the user who issued it. If a user already
has 2 warnings, they will be banned. A DM will be sent to them with the reason
and it will be logged to the bans channel. Once they are banned, all of their
warnings are removed from the database.

`.warnlist <user>` (or `.warns <user>`) will list all of the warnings a user
has, the reasons for these warnings, and the people who warned them.

`.clearwarns <user> [<amount>]` (or `.cwarns <user> [<amount>]`) will clear the
specified amount of warnings from a user. If no amount is specified, all
warnings will be removed.

### Banning Users

If a user has a role that allows them to ban users, they can use the ban
command.

`.ban <user> <reason> [<rm>]` will ban a user for the specified reason. If
`--rm` is included, their messages from the past 7 days will be deleted.

### Unbanning Users

If a user has a role that allows them to ban user, they are able to use
the unban command.

`.unban <user> [<reason>]` will unban a user for the specified reason. If no
reason is specified, "Unbanned via unban command." will be used. `<user>` is
able to be something that can be parsed as a user: their case-sensitive tag
(eg. `RedXTech#1234`), their case-sensitive username (eg. `RedXTech`), or their
[unique ID]([Discord ID](https://goo.gl/fTsqkq)).

### Reporting Users

Any user can use the report command.

`.report <message>` will send a message into the reports channel with the
message, the name of the user who sent it, and the channel that it was sent
from.

### Tags

Any user is able to use tags and list tags.

`.tag <tag> [<user>]` will call up a tag. If `<user>` is specified, the bot will
tag the user when sending the message.

`.tags` will show a list of tags. This list will be deleted after 10 seconds.

> Tags commands can be used in DMs.

### Good Boye Points

Any user can see the top/bottom lists, their own GBP score, and the GBP scores
of others. However, if they do not have permission to kick users, they cannot
add, remove, or set the GBP for anyone.

`.gbp top` will show the 10 users with most points.

`.gbp bottom` will show the 10 users with the least points.

`.gbp show [<user>]` will show the GBP of a user. If no user is specified, the
user who called the command will be used.

`.gbp add <user> [<amount>]` will add the specified amount of points to a user.
If no amount is specified, 1 is used.

`.gbp rm <user> [<amount>]` will remove the specified amount of points to a
user. If no amount is specified, 1 point will be deducted.

`.gbp set <user> [<amount>]` will set the amount of points for the specified
user.

`.gbp help` will show the user how to use the GBP system.

### Roles System

Anyone can use the role command. It will add & remove roles that have been
whitelisted in `src/approvedRoles.js`.

`.role add <role>` will add the specified role.

`role rm <role>` will remove the specified role.

Both commands are case sensitive.

### Prune

Anyone with MANAGE_MESSAGES permission can use this command.

`.prune [<amount>]` will remove the specified amount of commands from the
current channel. If no number is specified, the default is 5.

### Stats & Users Commands

These commands can be used by all users on the server.

`.stats` will display stats about the user.

`.users` will display the number of users on the server.

### LMGTFY

This command can be used by anyone.

`.lmgtfy <query>` will send a link with the LMGTFY query.

### Help

Anyone can use this command.

`.help` will send a message with a list of commands and how to use them. The
message will be deleted after 10 seconds.

> Help command can be used in DMs.

### Ping

Anyone can use this command.

`.ping` will send a message to the chat with the ping and round trip time of the
bot.

> Ping command can be used in DMs.

## Future Ideas

- Add configurable permission levels for commands.
- Add configuration for whether to delete warns on a ban.
- Add option to prevent certain user from using report command.
- Add usage statistics to DB.