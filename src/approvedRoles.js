/*
 * Gabe Dunn 2018
 * Config file for approved roles.
 */
export const rolesMessages = [
  {
    name: 'Descriptive Roles',
    message: 'These roles are meant to be descriptive about what you do. You' +
    ' can add these by reacting to this message with the corresponding emoji.',
    roles: {
      'project manager': {name: 'Project Manager', emoji: '🍏'},
      'fullstack': {name: 'Fullstack', emoji: '🍔'},
      'frontend': {name: 'Frontend', emoji: '🍎'},
      'backend': {name: 'Backend', emoji: '🍐'},
      'sysadmin': {name: 'Sysadmin', emoji: '🍊'},
      'devops': {name: 'DevOps', emoji: '🍋'},
      'designer': {name: 'Designer', emoji: '🍌'},
      'senior': {name: 'Senior', emoji: '🍉'},
      'junior': {name: 'Junior', emoji: '🍇'}
    }
  },
  {
    name: 'Channel Roles',
    message: 'These roles allow you to manage what channels you are able to' +
    ' view. Add them by reacting with the corresponding emoji.',
    roles: {
      'no-frontend': {name: 'No-Frontend', emoji: '🍓'},
      'no-devops': {name: 'No-DevOps', emoji: '🧀'},
      'no-designer': {name: 'No-Designer', emoji: '🍈'},
      'no-php': {name: 'No-PHP', emoji: '🍒'},
      'no-python': {name: 'No-Python', emoji: '🍑'},
      'no-ruby': {name: 'No-Ruby', emoji: '🍍'},
      'no-c#': {name: 'No-C#', emoji: '🍕'},
      'no-java': {name: 'No-Java', emoji: '🍅'},
      'no-go': {name: 'No-Go', emoji: '🍆'},
      'no-rust': {name: 'No-Rust', emoji: '🌭'},
      'no-sql': {name: 'No-SQL', emoji: '🌽'},
      'no-seo': {name: 'No-SEO', emoji: '🍟'}
    }
  }
]

export const allRoles = {}
export const allRolesMap = {}

for (const roles of rolesMessages) {
  for (const role of Object.entries(roles.roles)) {
    allRoles[role[0]] = role[1].name
    allRolesMap[role[0]] = role[1]
  }
}
