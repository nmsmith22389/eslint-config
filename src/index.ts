// eslint-disable-next-line import/no-relative-parent-imports
import type { Linter, ESLintRules as Rules } from '../types/eslint';
// /* eslint-disable @typescript-eslint/ban-ts-ignore */
// //@ts-ignore
// import { Linter as LinterCtor } from './node_modules/eslint';

// const Linters: Linter = new LinterCtor();
// const rulesMap = Linters.getRules() as Map<keyof Rules, any>;

// const allRulesOff: Record<string, 'off'> = {};

// rulesMap.forEach((_val, key) => {
//     allRulesOff[key] = 'off';
// });

const config: Linter.Config<Rules> = {
    // root: true,
    env: {
        browser: true,
        node: true,
    },
    parserOptions: {
        // extraFileExtensions: ['.vue'],
        // ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module',
    },
    extends: [
        // '@nuxtjs/eslint-config-typescript',
        'eslint:recommended',
        // 'plugin:vue/recommended',
        // 'plugin:vue-types/strongly-recommended',
        'plugin:prettier/recommended',
        'prettier',
        // 'prettier/vue',
        // './import',
        // './typescript',
    ],
    plugins: [
        'prettier',
        // 'vue'
    ],
    rules: {
        'new-cap': 'off',
        'spaced-comment': 'off',
        //? This is causing errors with optional chaining.
        'no-unused-expressions': 'off',
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
