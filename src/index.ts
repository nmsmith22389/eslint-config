// eslint-disable-next-line import/no-relative-parent-imports
import type { Linter, ESLintRules as Rules } from '../types/eslint';

const config: Linter.Config<Rules> = {
    // root: true,
    env: {
        browser: true,
        node: true,
    },
    parserOptions: {
        // ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module',
    },
    extends: ['eslint:recommended', 'plugin:prettier/recommended'],
    plugins: [
        'prettier',
        // 'vue'
    ],
    rules: {
        'new-cap': 'off',
        'spaced-comment': 'off',
        //? This is causing errors with optional chaining.
        'no-unused-expressions': 'off',
        'no-void': ['error', { allowAsStatement: true }],
    },
    overrides: [
        {
            files: ['./try.js'],
            rules: {
                'no-console': 'off',
            },
        },
        {
            files: ['**/*.d.ts'],
            rules: {
                'no-dupe-class-members': 'off',
                //? Off because it was causing errors.
                'no-useless-constructor': 'off',
            },
        },
        {
            files: ['**/*.js'],
            rules: {
                'no-unused-vars': 'warn',
            },
        },
    ],
    reportUnusedDisableDirectives: true,
};

export = config;
