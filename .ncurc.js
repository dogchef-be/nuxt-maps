const minorUpdatesOnly = ['nuxt']

const patchUpdatesOnly = [
  'eslint', // ! Breaks @nuxtjs/eslint-config-typescript
  /**
   * ! START: Needs eslint@^9
   */
  '@typescript-eslint/eslint-plugin',
  '@typescript-eslint/parser',
  '@vue/eslint-config-prettier',
  '@vue/eslint-config-typescript',
  'eslint-plugin-unused-imports',
  /**
   * ! END: Needs eslint@^9
   */
  'typescript', // ! Breaks vue-tsc
]

module.exports = {
  upgrade: true,
  install: 'always',
  target: (name) => {
    if (patchUpdatesOnly.includes(name)) return 'patch'

    if (minorUpdatesOnly.includes(name)) return 'minor'

    return 'latest'
  },
  reject: ['sass'],
}
