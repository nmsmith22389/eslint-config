/* eslint-disable import/no-relative-parent-imports */
import type { Linter } from '../../types/eslint';
import type { TypescriptRules as Rules } from '../../types/typescript';

type KnownKeys<T> = {
    [K in keyof T]: string extends K ? never : number extends K ? never : K;
} extends { [_ in keyof T]: infer U }
    ? U
    : never;

const rulesOff: Record<KnownKeys<Rules>, 'off'> = {
    '@typescript-eslint/adjacent-overload-signatures': 'off',
    '@typescript-eslint/array-type': 'off',
    '@typescript-eslint/await-thenable': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-tslint-comment': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/brace-style': 'off',
    '@typescript-eslint/class-literal-property-style': 'off',
    // '@typescript-eslint/comma-spacing': 'off',
    '@typescript-eslint/consistent-type-assertions': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/consistent-type-imports': 'off',
    // '@typescript-eslint/default-param-last': 'off',
    // '@typescript-eslint/dot-notation': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    // '@typescript-eslint/func-call-spacing': 'off',
    '@typescript-eslint/generic-type-naming': 'off',
    '@typescript-eslint/indent': 'off',
    // '@typescript-eslint/init-declarations': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    // '@typescript-eslint/keyword-spacing': 'off',
    // '@typescript-eslint/lines-between-class-members': 'off',
    '@typescript-eslint/member-delimiter-style': 'off',
    '@typescript-eslint/member-naming': 'off',
    '@typescript-eslint/member-ordering': 'off',
    // '@typescript-eslint/method-signature-style': 'off',
    // '@typescript-eslint/naming-convention': 'off',
    '@typescript-eslint/no-array-constructor': 'off',
    // '@typescript-eslint/no-base-to-string': 'off',
    // '@typescript-eslint/no-confusing-non-null-assertion': 'off',
    // '@typescript-eslint/no-dupe-class-members': 'off',
    '@typescript-eslint/no-dynamic-delete': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    // '@typescript-eslint/no-extra-non-null-assertion': 'off',
    '@typescript-eslint/no-extra-parens': 'off',
    // '@typescript-eslint/no-extra-semi': 'off',
    '@typescript-eslint/no-extraneous-class': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/no-for-in-array': 'off',
    // '@typescript-eslint/no-implicit-any-catch': 'off',
    // '@typescript-eslint/no-implied-eval': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    // '@typescript-eslint/no-invalid-this': 'off',
    // '@typescript-eslint/no-invalid-void-type': 'off',
    // '@typescript-eslint/no-loop-func': 'off',
    // '@typescript-eslint/no-loss-of-precision': 'off',
    '@typescript-eslint/no-magic-numbers': 'off',
    '@typescript-eslint/no-misused-new': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/no-namespace': 'off',
    // '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-parameter-properties': 'off',
    // '@typescript-eslint/no-redeclare': 'off',
    '@typescript-eslint/no-require-imports': 'off',
    // '@typescript-eslint/no-shadow': 'off',
    '@typescript-eslint/no-this-alias': 'off',
    // '@typescript-eslint/no-throw-literal': 'off',
    '@typescript-eslint/no-type-alias': 'off',
    // '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'off',
    '@typescript-eslint/no-unnecessary-condition': 'off',
    '@typescript-eslint/no-unnecessary-qualifier': 'off',
    '@typescript-eslint/no-unnecessary-type-arguments': 'off',
    '@typescript-eslint/no-unnecessary-type-assertion': 'off',
    // '@typescript-eslint/no-unsafe-assignment': 'off',
    // '@typescript-eslint/no-unsafe-call': 'off',
    // '@typescript-eslint/no-unsafe-member-access': 'off',
    // '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-untyped-public-signature': 'off',
    '@typescript-eslint/no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-useless-constructor': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    // '@typescript-eslint/prefer-as-const': 'off',
    // '@typescript-eslint/prefer-enum-initializers': 'off',
    '@typescript-eslint/prefer-for-of': 'off',
    '@typescript-eslint/prefer-function-type': 'off',
    '@typescript-eslint/prefer-includes': 'off',
    // '@typescript-eslint/prefer-literal-enum-member': 'off',
    '@typescript-eslint/prefer-namespace-keyword': 'off',
    // '@typescript-eslint/prefer-nullish-coalescing': 'off',
    // '@typescript-eslint/prefer-optional-chain': 'off',
    '@typescript-eslint/prefer-readonly': 'off',
    // '@typescript-eslint/prefer-readonly-parameter-types': 'off',
    // '@typescript-eslint/prefer-reduce-type-parameter': 'off',
    '@typescript-eslint/prefer-regexp-exec': 'off',
    '@typescript-eslint/prefer-string-starts-ends-with': 'off',
    // '@typescript-eslint/prefer-ts-expect-error': 'off',
    '@typescript-eslint/promise-function-async': 'off',
    '@typescript-eslint/quotes': 'off',
    '@typescript-eslint/require-array-sort-compare': 'off',
    '@typescript-eslint/require-await': 'off',
    '@typescript-eslint/restrict-plus-operands': 'off',
    // '@typescript-eslint/restrict-template-expressions': 'off',
    // '@typescript-eslint/return-await': 'off',
    '@typescript-eslint/semi': 'off',
    '@typescript-eslint/space-before-function-paren': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    // '@typescript-eslint/switch-exhaustiveness-check': 'off',
    '@typescript-eslint/triple-slash-reference': 'off',
    '@typescript-eslint/type-annotation-spacing': 'off',
    '@typescript-eslint/typedef': 'off',
    '@typescript-eslint/unbound-method': 'off',
    '@typescript-eslint/unified-signatures': 'off',
};

const config: Linter.Config<Rules> = {
    parserOptions: {
        parser: '@typescript-eslint/parser',
        // project: './tsconfig.eslint.json',
        ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module',
    },
    extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',

        // NOTE: Below was merged into just 'prettier'
        // 'prettier/@typescript-eslint',
    ],
    rules: {
        'no-unused-vars': 'off',

        //> Typescript
        // From @nuxtjs/eslint-config-typescript
        '@typescript-eslint/array-type': ['warn', { default: 'array-simple' }],
        '@typescript-eslint/explicit-function-return-type': 'warn',
        // '@typescript-eslint/no-explicit-any': ['warn', { fixToUnknown: true }],
        '@typescript-eslint/no-explicit-any': ['off', { fixToUnknown: true }],
        '@typescript-eslint/no-unnecessary-condition': 'error',
        '@typescript-eslint/no-unused-vars': [
            'warn',
            {
                varsIgnorePattern: '^_',
                args: 'all',
                argsIgnorePattern: '^_',
            },
        ],

        // TODO: Look over TS rules and configure all of them!
        // NOTE: new rules... check to see if they are in preset
        //@ New TS Rules
        '@typescript-eslint/prefer-nullish-coalescing': 'warn',
        '@typescript-eslint/prefer-optional-chain': 'warn',
    },
    overrides: [
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
            rules: rulesOff,
        },
    ],
    plugins: ['@typescript-eslint'],
};

export = config;
