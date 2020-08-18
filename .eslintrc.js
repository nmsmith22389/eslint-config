/**
 * @typedef {import('./types/eslint').Linter.Config<Rules>} Config
 * @template {import('./types/eslint').Linter.RulesRecord} Rules
 */

/**
 * @typedef {import('./types/eslint').ESLintRules} ESLintRules
 * @typedef {import('./types/import').ImportRules} ImportRules
 * @typedef {import('./types/typescript').TypescriptRules} TypescriptRules
 */

/**
 * @type {Config<ESLintRules & ImportRules & TypescriptRules>}
 */
const config = {
    extends: ['./dist', './dist/typescript', './dist/import'],
    rules: {},
};

module.exports = config;
