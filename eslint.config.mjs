import { globalIgnores } from 'eslint/config'
import tsEslint from 'typescript-eslint'

export default tsEslint.config([
  globalIgnores(['dist', 'node_modules']),
  {
    rules: {
      semi: ['error', 'never'],
      quotes: ['error', 'single'],
      '@typescript-eslint/no-explicit-any': ['off'],
    },
  },
  ...tsEslint.configs.recommended,
])
