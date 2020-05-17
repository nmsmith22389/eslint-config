/* eslint-disable import/no-relative-parent-imports */
import type { Linter } from '../../types/eslint';
import type { ImportRules as Rules } from '../../types/import';

const allExtensions = ['.ts', '.tsx', '.d.ts', '.js', '.jsx'];

export = {
    rules: {
        //> Rules

        'import/default': 'error',

        'import/dynamic-import-chunkname': 'off',

        'import/export': 'error',

        'import/exports-last': 'warn',

        // 'import/extensions': ['warn'],

        'import/first': 'warn',

        'import/group-exports': 'off',

        'import/max-dependencies': ['warn', { max: 10 }],

        'import/named': 'off',

        'import/namespace': 'error',

        'import/newline-after-import': 'warn',

        'import/no-absolute-path': 'warn',

        'import/no-amd': 'off',

        'import/no-anonymous-default-export': [
            'error',
            {
                allowArray: false,
                allowArrowFunction: false,
                allowAnonymousClass: false,
                allowAnonymousFunction: false,
                allowCallExpression: true, // The true value here is for backward compatibility
                allowLiteral: false,
                allowObject: false,
            },
        ],

        'import/no-commonjs': 'off',

        'import/no-cycle': 'off',

        'import/no-default-export': 'off',

        'import/no-deprecated': 'warn',

        'import/no-duplicates': 'warn',

        'import/no-dynamic-require': 'off',

        'import/no-extraneous-dependencies': 'off',

        'import/no-internal-modules': 'off',

        'import/no-mutable-exports': 'error',

        'import/no-named-as-default-member': 'error',

        'import/no-named-as-default': 'error',

        'import/no-named-default': 'error',

        'import/no-named-export': 'off',

        'import/no-namespace': 'off',

        'import/no-nodejs-modules': 'warn',

        'import/no-relative-parent-imports': 'warn',

        'import/no-restricted-paths': 'off',

        'import/no-self-import': 'error',

        'import/no-unassigned-import': 'warn',

        'import/no-unresolved': 'off',

        'import/no-unused-modules': 'off',

        'import/no-useless-path-segments': [
            'warn',
            {
                noUselessIndex: true,
            },
        ],

        'import/no-webpack-loader-syntax': 'error',

        'import/order': [
            'warn',
            { groups: ['builtin', 'external', ['parent', 'sibling'], 'index'] },
        ],

        'import/prefer-default-export': 'warn',

        'import/unambiguous': 'off',
    },
    overrides: [],
    plugins: ['import'],
    settings: {
        // 'import/resolver': ['webpack'],
        'import/extensions': allExtensions,
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx', '.d.ts'],
        },
        'import/resolver': {
            node: {
                extensions: allExtensions,
            },
        },
    },
} as Linter.Config<Rules>;
