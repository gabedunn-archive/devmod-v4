import colours from './colours'

export default {
  bot: {
    title: 'Bot Channel',
    color: colours.blue,
    description: 'Please use commands related to the bot in the #bot' +
    ' channel. Thanks.'
  },
  ask: {
    title: 'Asking to Ask',
    color: colours.red,
    description: 'Instead of asking to ask, ask your question instead.' +
    ' People can help you better if they know your question.\n\n' +
    'Example: "Hey can anyone help me with some JS?" & "Anyone good with' +
    ' JS?" => "I\'m having trouble adding a class to a div using JS. Can I' +
    ' have some help?"'
  },
  jobs: {
    title: 'Jobs',
    color: colours.blue,
    description: 'No job offers allowed on this server please. Free work is' +
    ' allowed, but not many people will want to work for free.'
  },
  whynojobs: {
    title: 'Why there are no Jobs',
    color: colours.blue,
    description: 'In the past, there have been multiple cases of people' +
    ' being scammed when taking a job with someone else on this server. We' +
    ' do not want to be associated with that, so we have removed jobs' +
    ' entirely.\n\nThanks for understanding.'
  },
  sfw: {
    title: 'SFW (Safe for Work)',
    color: colours.yellow,
    description: 'Please keep the messages safe for work here.'
  },
  channels: {
    title: 'Posting in Multiple Channels',
    color: colours.orange,
    description: 'It would be greatly appreciated if you kept your posting' +
    ' to the channel designated for that topic, and not posting it in' +
    ' multiple channels.'
  },
  cs: {
    title: 'Christian Server',
    color: colours.red,
    image: {url: 'https://cdn.discordapp.com/attachments/174075418410876928/377425219872096256/maxresdefault.png'}
  },
  canudont: {
    title: 'Can U Dont',
    color: colours.blue,
    image: {url: 'https://cdn.discordapp.com/attachments/174075418410876928/428989988286365696/can_u_dont.jpg'}
  },
  code: {
    title: 'Use Code Blocks',
    color: colours.blue,
    fields: [
      {
        name: 'To directly post code into Discord, type:',
        value: '\\`\\`\\`lang\n// code\nconsole.log(\'I have no' +
        ' language.\')\n\\`\\`\\`'
      }, {
        name: 'For syntax highlighting replace lang with the language (js,' +
        ' css, html, etc.):',
        value: '\\`\\`\\`js\nconsole.log(\'hello this is js\')\n\\`\\`\\`'
      }, {
        name: 'How the first will look:',
        value: '```LANGUAGE\n// code\nconsole.log(\'I have no language.\')\n```'
      }, {
        name: 'How it will look with highlighting:',
        value: '```js\nconsole.log(\'hello this is js\')\n```'
      }]
  },
  pen: {
    title: 'Post Your Code',
    color: colours.blue,
    description: 'Post your code online. Here are some options:',
    fields: [
      {
        name: 'CodePen (https://codepen.io/)',
        value: 'CodePen is a nice place to post your code online.',
        inline: true
      }, {
        name: 'JSFiddle (https://jsfiddle.net/)',
        value: 'JSFiddle is also a nice place to post your code online.',
        inline: true
      },
      {
        name: 'GitHub (https://github.com)',
        value: 'GitHub is a great place to post the code for full projects.',
        inline: true
      },
      {
        name: 'CodeSandbox (https://codesandbox.io/)',
        value: 'CodeSandbox is a great place to play around with a full node' +
        ' environment without having it locally.',
        inline: true
      }]
  },
  gbp: {
    title: 'Good Boye Points',
    color: colours.green,
    description: 'Good Boye Points (GBP) are the best way to tell if a user' +
    ' has been a good addition to the server. You can get GBP only by the' +
    ' generosity of the overlords (Admins & Mods). See how many you have with' +
    ' `.gbp show`. Find the best people on the server with `.gbp top`'
  },
  roadmap: {
    title: 'Developer Roadmap',
    url: 'https://github.com/kamranahmedse/developer-roadmap',
    color: colours.blue,
    description: 'This is a very nice outline on the general technologies' +
    ' recommended for the path of your choosing. Use the as an outline, and' +
    ' not as the sole source of authority. Make your own decisions as well.'
  }
}
