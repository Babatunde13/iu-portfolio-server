module.exports = {
    'env': {
        'browser': true,
        'es2021': true,
        'node': true,
        'mocha': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaVersion': 12,
        'sourceType': 'module'
    },
    'plugins': [
        '@typescript-eslint'
    ],
    'rules': {
        quotes: ['error', 'single'],
        semi: ['error', 'never'],
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/ban-types': 'off',
        // custom rules
        no_dangerous_function: 'off'
    }
}
