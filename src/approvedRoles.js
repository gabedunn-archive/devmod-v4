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
      'helper': {name: 'helpers', emoji: '🚁'},
      'css-html-help': {name: 'css-html-help', emoji: '📰'},
      'ui-help': {name: 'ui-help', emoji: '📱'},
      'php-help': {name: 'php-help', emoji: '🦖'},
      'javascript-help': {name: 'javascript-help', emoji: '🖥'},
      'developer': {name: 'developer', emoji: '☕'},
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
