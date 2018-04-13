# DevMod
 > A discord bot for moderating servers.

This was originally made to moderate the DevCord discord community, but
has nothing that you need to be a developer to use.

## Setup
### Step 1 - Creating the bot user
The first thing that you will need to do it go to the
[Discord Developers](https://discordapp.com/developers/applications/me)
page, where you can create a new app. You can name the bot whatever you
want, and give it a profile picture if you would like. Once you have
done that, you can click on create app. Scroll down to the "Bot"
section and click on "Create a Bot User". Once you confirm this, the bot
section will expand and you will be able to get a token. Click to reveal
that, and keep the token safe. It's what allows the bot to log in to
discord.
### Step 2 - Inviting the bot to your server
Now you will need to scroll up to the OAuth2 URL generator. Click on
that and it should open a new tab with some options. Make sure that
under "scope" bot is selected, and select Administrator (This is to make
sure that the bot can see all of the channels, ban users, and the like.)
Once you have that selected, click on copy in the field that has the URL
and paste that into your browser. You will see a list of servers that
you have administrator permissions on, and once you select one, you can
click authorize and the bot will join the server.
### Step 3 - Set up where the bot is hosted
This bot runs on node, so you will have to have that installed. Their
website is [here](https://nodejs.org). Once you have that installed, you
need to clone the bot. To do this, you can use git command line and the
`git clone` command if you know how to use that. If not, just download
repo as a zip and unpack that to any folder of your choosing. Open up
your command line and `cd` into the folder you just cloned/unzipped.
Run `npm install` to install all of the dependencies and then `npm
install -g pm2` to be able to run the bot in the background. Now that
you have everything set up, you need to set up the config.
### Step 4 - Configuring the bot
This part is easy. Just type in `npm run env` and it will ask you some
questions.

Option | Default | Description
---|---|---
`BOT_TOKEN` | | The token you got from creating the bot user.
`OWNER_ID` | | Your [Discord ID](https://goo.gl/fTsqkq).
`PREFIX` | `.` | The prefix to start off all bot commands.
`MSG_DELETE_TIME` | `10` | The amount in seconds of how long to wait before deleting the help commands.
`DB_FILE` | `devmod.sqlite` | The name for the database file for warnings and points.
`AUTOBAN` | `true` | Whether or not to automatically ban a user after hitting the maximum warnings.
`AUTOBAN_WARNS` | `3` | How many warnings are needed to autoban a user.
`BAN_MSG_DELETE` | `0` | How many days of a users messages to delete after being banned.
`CHANNEL_LOG_WARN` | `warnings` | The name of the channel to log warnings.
`CHANNEL_LOG_BAN` | `bans` | The name of the channel to log bans.
`CHANNEL_LOG_REPORT` | `reports` | The name of the channel to log reports.
`POINTS_EMOJI` | `boye` | Name of the server specific emoji to append to Good Boye Points.
`STATUS_INTERVAL` | `5` | Amount in minutes of time between changing the bot's status.
`POINTS_TOP_COUNT` | `10` | Amount of users to show in Good Boye Points top and bottom commands.

Additionally, you will need to look in src/approvedRoles.js and add the
names of all the roles you want people to be able to add to themselves
via the role command. This is case sensitive, so be sure to get it 100%
accurate.

### Step 5 - Running the bot
Now that you have all of these options set up, you can run the bot. This
is very simple. If you want to just run it on your computer while
keeping the command line window open, just run `npm run start`, and it
will start up. If you want to run the bot in the background, use `pm2`.
`pm2 start devmod.js` Will make the bot run in the background so you do
not have to have a window open for it.

Now the bot is ready for use!

> Just a quick note - the tags in src/tags.js, the activities in
src/activities.js, and the roles in src/approvedRoles.js may not be
specific to all servers, so make sure to check those out before running
the bot.

## Features & Usage
> For this I will show the commands assuming all of the config options
are the defaults.

### Warning users
If a user has a role that allows them to kick users, they can use the
warns system.

`.warn <user> <reason>` will send a DM to the user with their warning,
send a message to the channel specified in `CHANNEL_LOG_WARN`, and adds
the warning to the database file along with the ID of the user who
issued it. If a user already has 2 warnings, they will be banned. A DM
will be sent to them with the reason, and it will be logged to the bans
channel. Once they are banned, all of their warnings are removed from
the database.

`.warnlist <user>` (or `.warns <user>`) will list all of the warnings a user has,
along with the reason and who warned them.

`.clearwarns <user> [<amount>]` (or `.cwarns <user> [<amount>]`) will
clear the specified amount of warnings from a user. If no amount is
specified, all warnings will be removed.

### Banning users
If a user has a role that allows them to ban users, then can use the ban
command.

`.ban <user> <reason> [<rm>]` will ban a user for the specified reason.
If `--rm` is included, their messages from the past 7 days will be
deleted.

### Unbanning Users
If a user has a role that allows them to ban user, they are able to use
the unban command.

`.unban <user> [<reason>]` will unban a user for the specified reason.
If no reason is specified, "Unbanned via unban command." will be used.
`<user>` is able to be something that can be parsed as a user: their
case-sensitive tag (eg. `RedXTech#1234`), their case-sensitive username
(eg. `RedXTech`), or their [unique ID]([Discord ID](https://goo.gl/fTsqkq)).

### Reporting users
Any user can use the report command.

`.report <message>` will send a message into the reports channel with
the message, the name of the user who sent it, and the channel that it
was sent from.

### Tags
Any user is able to use tags and list tags.

`.tag <tag> [<user>]` will call up a tag, and if `<user>` is specified,
bot will tag the user when sending the message.

`.tags` will show a list of tags that will be deleted after 10 seconds.

> Tags commands can be used in DMs.

### Good Boye Points
Any user can see the top/bottom lists, their own GBP score, and that of
others, but if they do not have permission to kick users, they cannot
add, remove, or set the GBP for anyone.

`.gbp top` will show the 10 users with most points.

`.gbp bottom` will do the same as top but the least points.

`.gbp show [<user>]` will show the GBP of a user. If no user is
specified, the user who send the message is used.

`.gbp add <user> [<amount>]` will add the specified amount of points to
a user. If no amount is specified, 1 is used.

`.gbp rm <user> [<amount>]` will do the same as add but will remove.

`.gbp set <user> [<amount>]` will do the same but will set the points.

`.gbp help` will show how to use the GBP system.

### Roles System
Anyone can use the role command. It will add & remove roles that have been
whitelisted in src/approvedRoles.js.

`.role add <role>` will add the specified role, and

`role rm <role>` will remove the specified role. Both of these are case
sensitive.

### Prune
Anyone with MANAGE_MESSAGES permission can use this command.

`.prune [<amount>]` will remove the specified amount of commands from
the current channel. If no number is specified, the default is 5.

### Stats & Users Commands
These commands can be used by all users on the server.

`.stats` & `.users` will show some stats & the amount of users on the
server.

### LMGTFY
This command can be used by anyone.

`.lmgtfy <query>` will send a link with the LMGTFY query.

### Help
Anyone can use this command.

`.help` will send a message with a list of commands and how to use them.
The message will be deleted after 10 seconds.

> Help command can be used in DMs.

### Ping
Anyone can use this command.

`.ping` will send a message to the chat with the ping and round trip
of the bot at the time.

> Ping command can be used in DMs.

## Future Ideas
 - Add configurable permission levels for commands.
 - Add configuration for whether to delete warns on a ban.
 - Add option to prevent certain user from using report command.
 - Add usage statistics to DB.