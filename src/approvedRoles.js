/*
 * Gabe Dunn 2018
 * Config file for approved roles.
 */
export const rolesMessages = [
  {
    name: 'Descriptive Roles',
    message:
      'These roles are meant to be descriptive about what you do. You' +
      ' can add these by reacting to this message with the corresponding emoji.',
    roles: {
      developer: { name: 'Developer', emoji: '☕' },
      helper: { name: 'Helper (general)', emoji: '🚁' },
      'javascript-help': { name: 'JavasScript Helper', emoji: '🖥' },
      'css-html-help': { name: 'CSS/HTML Helper', emoji: '📰' },
      'ui-help': { name: 'UI Helper', emoji: '📱' },
      'php-help': { name: 'PHP Helper', emoji: '♦' }
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
