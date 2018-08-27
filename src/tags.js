/*
 * Gabe Dunn 2018
 * List of available tags.
 */
import colours from './colours'

export default {
  bot: {
    title: 'Bot Channel',
    color: colours.blue,
    description: 'Please use commands related to the bot in the' +
    ' <#271293371438333952> channel. Thanks.'
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
    ' to the channel designated for that topic. Additionally, please refrain' +
    ' from posting the same question in multiple channels.'
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
  },
  nice: {
    title: 'Nice',
    color: colours.blue,
    image: {url: 'https://cdn.discordapp.com/attachments/287200463382642689/433326230495035412/1447912710960.jpg'}
  },
  editor: {
    title: 'IDEs & Text Editors',
    color: colours.blue,
    description: 'There are many different ways to edit code, from code' +
    ' editors to Integrated Development Environments ("IDEs"). Here are some' +
    ' differences between the two and some examples of each:',
    fields: [
      {
        name: 'IDEs',
        value: 'IDEs (Integrated Development Environment) are programs that' +
        ' include a code editor, but also integrations with various other' +
        ' development tools (linters, version control,' +
        ' intellisense/autocomplete, automatic refactoring, database' +
        ' management, etc.).'
      },
      {
        name: 'Code Editors',
        value: 'Code editors are text editors that usually include syntax' +
        ' highlighting, simple project management, and other helpful code' +
        ' editing tools.'
      },
      {
        name: 'WebStorm/PHPStorm (or any other JetBrains Product)',
        value: 'These IDEs, as they have a full suite of tools for' +
        ' development. Additionally they have a plugin system for anything' +
        ' that they do not automatically include.'
      },
      {
        name: 'Visual Studio',
        value: 'Visual studio is a full IDE made by microsoft. It works well' +
        ' with .NET based languages, as they are made by the same people.' +
        ' They also include a plugin system.'
      },
      {
        name: 'NetBeans',
        value: 'I honestly don\'t know much about NetBeans, having never' +
        ' used it. If you know more make a PR on the DevMod repo. I do know' +
        ' that it is a Java IDE.'
      },
      {
        name: 'Atom',
        value: 'Atom is a code editor based on web technology. It\'s made by' +
        ' GitHub, and has a massive community, with plugins for everything.'
      },
      {
        name: 'VS Code',
        value: 'VS Code is another editor based off of web technology, but' +
        ' is better optimized and runs faster. This is built by microsoft' +
        ' and has a large set of plugins as well.'
      },
      {
        name: 'Sublime Text',
        value: 'Sublime text starts off as a nice small and fast editor.' +
        ' It\'s the fastest text editor that I\'ve seen. There is also a' +
        ' wide selection of plugins.'
      },
      {
        name: 'Vim',
        value: 'Vim is a command line text editor with plugins that can do' +
        ' pretty much anything. It is largely popular, but has a learning' +
        ' curve before you can be productive in it.'
      },
      {
        name: 'Brackets',
        value: 'Brackets is also based on web tech, and has a live reload' +
        ' feature that allows you to view your website live. Many other' +
        ' editors have this feature, but few work as smoothly as this one.'
      }
    ]
  },
  framework: {
    title: 'Frameworks (& Libraries)',
    color: colours.green,
    description: 'There is a large debate as to which framework is the best' +
    ' for your webapp, and this is just an overview of the top contenders.',
    fields: [
      {
        name: 'Vue',
        value: 'Vue is a web framework that is easy to learn and use while' +
        ' being quite powerful. It has been described as taking the best' +
        ' from both React and Angular, and combining them. They have a large' +
        ' community, and it\'s quite fun to use. It has separation of' +
        ' concerns while being all in the same file, and has a large' +
        ' community of people and plugins. There are projects like ream and' +
        ' nuxt for SSR, and it\'s lightweight (smaller file than jQuery).' +
        ' Vue also has nativescript-vue and weex to write mobile apps using' +
        ' the same Vue syntax.'
      },
      {
        name: 'React',
        value: 'React is not a framework, and is rather a library. It is' +
        ' backed by Facebook, and has a lot of useful features. It uses JSX,' +
        ' which is writing your HTML (or XML, actually) in javascript, and' +
        ' makes for a bit of a learning curve, but in the short time it' +
        ' takes to learn it\'s interesting to use. React also has React' +
        ' native which allows mobile development using the same syntax and' +
        ' application logic as your rect webapp.'
      },
      {
        name: 'Angular 5',
        value: 'I do not know as much about Angular as I do Vue and React,' +
        ' (please make a PR if you have more knowledge), I do know that to' +
        ' use Angular, it\'s almost required to use typescript. Angular is a' +
        ' full MVC, so it provided the entire suite of tools including' +
        ' routing, state management, etc. This does lead to a more' +
        ' opinionated way of doing things, but makes making decisions a lot' +
        ' easier.'
      }
    ],
    footer: {
      text: 'My personal recommendation is Vue but definitely try out the' +
      ' others and use what you prefer.'
    }
  },
  invite: {
    title: 'Invite Link',
    color: colours.blue,
    url: 'https://discord.me/devcord',
    description: 'You can invite people with' +
    ' this link: [https://discord.me/devcord](https://discord.me/devcord).'
  },
  doubt: {
    title: '[x] Doubt',
    color: colours.blue,
    image: {url: 'https://media.discordapp.net/attachments/174075418410876928/435482310612221993/doubt.jpg?width=400&height=228'}
  },
  fasy: {
    color: colours.blue,
    image: {url: 'https://media.discordapp.net/attachments/174075418410876928/435887256843321354/loamy.jpg?width=401&height=84'}
  },
  dog: {
    color: colours.blue,
    image: {url: 'https://cdn.discordapp.com/attachments/174075418410876928/436958508039012379/unknown.png'}
  },
  sqlinjection: {
    title: 'Bind your parameters to prevent SQL injection',
    color: colours.blue,
    description: 'Don\'t get hacked, use prepared statements as explained here:',
    fields: [
      {
        name: 'PDO',
        value: '[Prepared statements with PDO](https://secure.php.net/manual/en/pdo.prepared-statements.php).',
      }, {
        name: 'Mysqli',
        value: '[Prepared statements with mysqli](https://secure.php.net/manual/en/mysqli.quickstart.prepared-statements.php).',
      }
    ]
  },
  template: {
    title: 'Template',
    color: colours.blue,
    description: 'The information needed to post your project in this channel.',
    fields: [
      {
        name: 'Project Description',
        value: 'A short description of the project.'
      },
      {
        name: 'Time Commitment',
        value: 'How long will this project take? How much time can someone expect to commit to this project? Is there a deadline or desired date of completion?'
      },
      {
        name: 'Languages',
        value: 'List all relevant languages.'
      },
      {
        name: 'Skill Level',
        value: 'What skill level are you looking for? Are you willing to work with junior developers or prefer middle/senior level developers?'
      },
      {
        name: 'Communication',
        value: 'What is the preferred method of communication? If a developer is interested, how should they contact you? Do NOT give out email addresses or other personally identifiable information.'
      }
    ]
  }
}
