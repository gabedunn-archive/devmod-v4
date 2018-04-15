export const reactionRolesMap = {
  'project manager': {name: 'Project Manager', emoji: '🍏'},
  'fullstack': {name: 'Fullstack', emoji: '🍔'},
  'frontend': {name: 'Frontend', emoji: '🍎'},
  'backend': {name: 'Backend', emoji: '🍐'},
  'sysadmin': {name: 'Sysadmin', emoji: '🍊'},
  'devops': {name: 'DevOps', emoji: '🍋'},
  'designer': {name: 'Designer', emoji: '🍌'},
  'senior': {name: 'Senior', emoji: '🍉'},
  'junior': {name: 'Junior', emoji: '🍇'},
  'no-frontend': {name: 'No-Frontend', emoji: '🍓'},
  'no-designer': {name: 'No-Designer', emoji: '🍈'},
  'no-php': {name: 'No-PHP', emoji: '🍒'},
  'no-python': {name: 'No-Python', emoji: '🍑'},
  'no-ruby': {name: 'No-Ruby', emoji: '🍍'},
  'no-c#': {name: 'No-C#', emoji: '🍕'},
  'no-java': {name: 'No-Java', emoji: '🍅'},
  'no-go': {name: 'No-Go', emoji: '🍆'},
  'no-swift': {name: 'No-Swift', emoji: '🌶'},
  'no-sql': {name: 'No-SQL', emoji: '🌽'},
  'np-seo': {name: 'No-SEO', emoji: '🍟'}
}

const rolesObject = {}

for (const role of Object.entries(reactionRolesMap)) {
  rolesObject[role[0]] = role[1].name
}

export default rolesObject