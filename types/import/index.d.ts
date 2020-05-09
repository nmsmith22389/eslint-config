/* eslint-disable import/max-dependencies */
import { Linter } from 'types/eslint';
import { Options as DynamicImportChunknameOptions } from './Options/DynamicImportChunkname';
import { Options as ExtensionsOptions } from './Options/Extensions';
import { Options as FirstOptions } from './Options/First';
import { Options as MaxDepsOptions } from './Options/MaxDependencies';
import { Options as NamespaceOptions } from './Options/Namespace';
import { Options as NewlineAfterImportOptions } from './Options/NewlineAfterImport';
import { Options as NoAbsolutePathOptions } from './Options/NoAbsolutePath';
import { Options as NoAnonymousDefaultExportOptions } from './Options/NoAnonymousDefaultExport';
import { Options as NoCommonjsOptions } from './Options/NoCommonjs';
import { Options as NoCycleOptions } from './Options/NoCycle';

import RulesRecord = Linter.RulesRecord;
import RuleEntry = Linter.RuleEntry;
// const a: Partial<ImportRules> = {
//     "import/dynamic-import-chunkname": ['error', {a: 'abc'}],
// };

// TODO: Move each rule into its own file (w/ options) so that each file has its own .md docs.

export interface ImportRules extends RulesRecord {
    /**
     * ## [import/default](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/default.md)
     *
     * If a default import is requested, this rule will report if there is no
     * default export in the imported module.
     *
     * For [ES7], reports if a default is named and exported but is not found in
     * the referenced module.
     *
     * Note: for packages, the plugin will find exported names from
     * [`jsnext:main`], if present in `package.json`. Redux's npm module
     * includes this key, and thereby is lintable, for example.
     *
     * A module path that is [ignored] or not [unambiguously an ES module] will
     * not be reported when imported.
     *
     * [ES7]: https://github.com/leebyron/ecmascript-more-export-from
     *
     * [`jsnext:main`]: https://github.com/rollup/rollup/wiki/jsnext:main
     *
     * [ignored]:
     * https://github.com/benmosher/eslint-plugin-import/blob/master/README.md#importignore
     *
     * [unambiguously an ES module]:
     * https://github.com/bmeck/UnambiguousJavaScriptGrammar
     * */
    'import/default': RuleEntry;
    /**
     * ## [import/dynamic-import-chunkname](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/dynamic-import-chunkname.md)
     *
     * ### Dynamic imports require a leading comment with a webpackChunkName.
     *
     * This rule reports any dynamic imports without a webpackChunkName
     * specified in a leading block comment in the proper format.
     *
     * This rule enforces naming of webpack chunks in dynamic imports. When you
     * don't explicitly name chunks, webpack will autogenerate chunk names that
     * are not consistent across builds, which prevents long-term browser
     * caching.
     */
    'import/dynamic-import-chunkname': RuleEntry<DynamicImportChunknameOptions>;
    /**
     * ## [import/export](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/export.md)
     *
     * Reports funny business with exports, like repeated exports of names or
     * defaults.
     */
    'import/export': RuleEntry;
    /**
     * ## [import/exports-last](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/exports-last.md)
     *
     * This rule enforces that all exports are declared at the bottom of the
     * file. This rule will report any export declarations that comes before any
     * non-export statements.
     */
    'import/exports-last': RuleEntry;
    /**
     * ## [import/extensions](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/extensions.md)
     *
     * ### Ensure consistent use of file extension within the import path.
     *
     * Some file resolve algorithms allow you to omit the file extension within
     * the import source path.
     *
     * For example the `node` resolver can resolve `./foo/bar` to the absolute
     * path `/User/someone/foo/bar.js` because the `.js` extension is resolved
     * automatically by default. Depending on the resolver you can configure
     * more extensions to get resolved automatically.
     *
     * In order to provide a consistent use of file extensions across your code
     * base, this rule can enforce or disallow the use of certain file
     * extensions.
     */
    'import/extensions': RuleEntry<ExtensionsOptions>;
    /**
     * ## [import/first](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/first.md)
     *
     * This rule reports any imports that come after non-import statements.
     */
    'import/first': RuleEntry<FirstOptions>;
    /**
     * ## [import/group-exports](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/group-exports.md)
     *
     * Reports when named exports are not grouped together in a single `export`
     * declaration or when multiple assignments to CommonJS `module.exports` or
     * `exports` object are present in a single file.
     *
     * **Rationale:** An `export` declaration or `module.exports` assignment can
     * appear anywhere in the code. By requiring a single export declaration all
     * your exports will remain at one place, making it easier to see what
     * exports a module provides.
     */
    'import/group-exports': RuleEntry;
    /**
     * ## [import/max-dependencies](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/max-dependencies.md)
     *
     * Forbid modules to have too many dependencies (`import` or `require`
     * statements).
     *
     * This is a useful rule because a module with too many dependencies is a
     * code smell, and usually indicates the module is doing too much and/or
     * should be broken up into smaller modules.
     *
     * Importing multiple named exports from a single module will only count
     * once (e.g. `import {x, y, z} from './foo'` will only count as a single
     * dependency).
     */
    'import/max-dependencies': RuleEntry<MaxDepsOptions>;
    /**
     * ## [import/named](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/named.md)
     *
     * Verifies that all named imports are part of the set of named exports in
     * the referenced module.
     *
     * For `export`, verifies that all named exports exist in the referenced
     * module.
     *
     * Note: for packages, the plugin will find exported names from
     * [`jsnext:main`], if present in `package.json`. Redux's npm module
     * includes this key, and thereby is lintable, for example.
     *
     * A module path that is [ignored] or not [unambiguously an ES module] will
     * not be reported when imported. Note that type imports and exports, as
     * used by [Flow], are always ignored.
     *
     * [`jsnext:main`]: https://github.com/rollup/rollup/wiki/jsnext:main
     *
     * [ignored]:
     * https://github.com/benmosher/eslint-plugin-import/blob/master/README.md#importignore
     *
     * [unambiguously an ES module]:
     * https://github.com/bmeck/UnambiguousJavaScriptGrammar
     *
     * [Flow]: https://flow.org/
     */
    'import/named': RuleEntry;
    /**
     * ## [import/namespace](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/namespace.md)
     *
     * Enforces names exist at the time they are dereferenced, when imported as
     * a full namespace (i.e. `import * as foo from './foo'; foo.bar();` will
     * report if `bar` is not exported by `./foo`.).
     *
     * Will report at the import declaration if there are _no_ exported names
     * found.
     *
     * Also, will report for computed references (i.e. `foo["bar"]()`).
     *
     * Reports on assignment to a member of an imported namespace.
     *
     * Note: for packages, the plugin will find exported names from
     * [`jsnext:main`], if present in `package.json`. Redux's npm module
     * includes this key, and thereby is lintable, for example.
     *
     * A module path that is [ignored] or not [unambiguously an ES module] will
     * not be reported when imported.
     *
     * [`jsnext:main`]: https://github.com/rollup/rollup/wiki/jsnext:main
     *
     * [ignored]:
     * https://github.com/benmosher/eslint-plugin-import/blob/master/README.md#importignore
     *
     * [unambiguously an ES module]:
     * https://github.com/bmeck/UnambiguousJavaScriptGrammar
     */
    'import/namespace': RuleEntry<NamespaceOptions>;
    /**
     * ## [import/newline-after-import](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/newline-after-import.md)
     *
     * Enforces having one or more empty lines after the last top-level import
     * statement or require call.
     *
     * +(fixable) The `--fix` option on the [command line] automatically fixes
     * problems reported by this rule.
     */
    'import/newline-after-import': RuleEntry<NewlineAfterImportOptions>;
    /**
     * ## [import/no-absolute-path](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-absolute-path.md)
     *
     * ### Forbid import of modules using absolute paths.
     *
     * Node.js allows the import of modules using an absolute path such as
     * `/home/xyz/file.js`. That is a bad practice as it ties the code using it
     * to your computer, and therefore makes it unusable in packages distributed
     * on `npm` for instance.
     */
    'import/no-absolute-path': RuleEntry<NoAbsolutePathOptions>;
    /**
     * ## [import/no-amd](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-amd.md)
     *
     * Reports `require([array], ...)` and `define([array], ...)` function calls
     * at the module scope. Will not report if !=2 arguments, or first argument
     * is not a literal array.
     *
     * Intended for temporary use when migrating to pure ES6 modules.
     */
    'import/no-amd': RuleEntry;
    /**
     * ## [import/no-anonymous-default-export](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-anonymous-default-export.md)
     *
     * Reports if a module's default export is unnamed. This includes several
     * types of unnamed data types; literals, object expressions, arrays,
     * anonymous functions, arrow functions, and anonymous class declarations.
     *
     * Ensuring that default exports are named helps improve the grepability of
     * the codebase by encouraging the re-use of the same identifier for the
     * module's default export at its declaration site and at its import sites.
     */
    'import/no-anonymous-default-export': RuleEntry<NoAnonymousDefaultExportOptions>;
    /**
     * ## [import/no-commonjs](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-commonjs.md)
     *
     * Reports `require([string])` function calls. Will not report if >1
     * argument, or single argument is not a literal string.
     *
     * Reports `module.exports` or `exports.*`, also.
     *
     * Intended for temporary use when migrating to pure ES6 modules.
     */
    'import/no-commonjs': RuleEntry<NoCommonjsOptions>;
    /**
     * ## [import/no-cycle](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-cycle.md)
     *
     * Ensures that there is no resolvable path back to this module via its
     * dependencies.
     *
     * This includes cycles of depth 1 (imported module imports me) to
     * `Infinity`, if the [`maxDepth`](#maxdepth) option is not set.
     *
     * ```js
     * // dep-b.js
     * import './dep-a.js'
     * export function b() {
     *     // ...
     * }
     * ```
     *
     * ```js
     * // dep-a.js
     * import { b } from './dep-b.js' // reported: Dependency cycle detected.
     * ```
     *
     * This rule does _not_ detect imports that resolve directly to the linted
     * module; for that, see [`no-self-import`].
     *
     * [`maxDepth`]:
     * https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-cycle.md#maxdepth
     *
     * [`no-self-import`]:
     * https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-self-import.md
     */
    'import/no-cycle': RuleEntry<NoCycleOptions>;
    /**
     * ## [import/no-default-export](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-default-export.md)
     *
     * Prohibit default exports. Mostly an inverse of [`prefer-default-export`].
     *
     * [`prefer-default-export`]:
     * https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/prefer-default-export.md
     */
    'import/no-default-export': RuleEntry;
    /**
     * ## [import/no-deprecated](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-deprecated.md)
     *
     * Reports use of a deprecated name, as indicated by a JSDoc block with a
     * `@deprecated` tag or TomDoc `Deprecated: ` comment.
     *
     * using a JSDoc `@deprecated` tag:
     *
     * ```js
     * // @file: ./answer.js
     *
     * // this is what you get when you trust a mouse talk show
     * // @deprecated need to restart the experiment
     * // @returns {Number} nonsense
     * export function multiply(six, nine) {
     *     return 42
     * }
     * ```
     *
     * will report as such:
     *
     * ```js
     * import { multiply } from './answer' // Deprecated: need to restart the experiment
     * function whatever(y, z) {
     *     return multiply(y, z) // Deprecated: need to restart the experiment
     * }
     * ```
     *
     * or using the TomDoc equivalent:
     *
     * ```js
     * // Deprecated: This is what you get when you trust a mouse talk show, need to
     * // restart the experiment.
     * //
     * // Returns a Number nonsense
     * export function multiply(six, nine) {
     *     return 42
     * }
     * ```
     *
     * Only JSDoc is enabled by default. Other documentation styles can be
     * enabled with the `import/docstyle` setting.
     *
     *
     * ```yaml
     * # .eslintrc.yml
     * settings:
     *     import/docstyle: ['jsdoc', 'tomdoc']
     * ```
     */
    'import/no-deprecated': RuleEntry;
    /**
     * TODO: Left of here.
     * ## [import/no-duplicates](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-duplicates.md)
     */
    'import/no-duplicates': RuleEntry;
    /**
     * ## [import/no-dynamic-require](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-dynamic-require.md)
     */
    'import/no-dynamic-require': RuleEntry;
    /**
     * ## [import/no-extraneous-dependencies](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md)
     */
    'import/no-extraneous-dependencies': RuleEntry;
    /**
     * ## [import/no-internal-modules](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-internal-modules.md)
     */
    'import/no-internal-modules': RuleEntry;
    /**
     * ## [import/no-mutable-exports](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-mutable-exports.md)
     */
    'import/no-mutable-exports': RuleEntry;
    /**
     * ## [import/no-named-as-default-member](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-named-as-default-member.md)
     */
    'import/no-named-as-default-member': RuleEntry;
    /**
     * ## [import/no-named-as-default](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-named-as-default.md)
     */
    'import/no-named-as-default': RuleEntry;
    /**
     * ## [import/no-named-default](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-named-default.md)
     */
    'import/no-named-default': RuleEntry;
    /**
     * ## [import/no-named-export](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-named-export.md)
     */
    'import/no-named-export': RuleEntry;
    /**
     * ## [import/no-namespace](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-namespace.md)
     */
    'import/no-namespace': RuleEntry;
    /**
     * ## [import/no-nodejs-modules](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-nodejs-modules.md)
     */
    'import/no-nodejs-modules': RuleEntry;
    /**
     * ## [import/no-relative-parent-imports](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-relative-parent-imports.md)
     */
    'import/no-relative-parent-imports': RuleEntry;
    /**
     * ## [import/no-restricted-paths](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-restricted-paths.md)
     */
    'import/no-restricted-paths': RuleEntry;
    /**
     * ## [import/no-self-import](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-self-import.md)
     */
    'import/no-self-import': RuleEntry;
    /**
     * ## [import/no-unassigned-import](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-unassigned-import.md)
     */
    'import/no-unassigned-import': RuleEntry;
    /**
     * ## [import/no-unresolved](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-unresolved.md)
     */
    'import/no-unresolved': RuleEntry;
    /**
     * ## [import/no-unused-modules](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-unused-modules.md)
     */
    'import/no-unused-modules': RuleEntry;
    /**
     * ## [import/no-useless-path-segments](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-useless-path-segments.md)
     */
    'import/no-useless-path-segments': RuleEntry;
    /**
     * ## [import/no-webpack-loader-syntax](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-webpack-loader-syntax.md)
     */
    'import/no-webpack-loader-syntax': RuleEntry;
    /**
     * ## [import/order](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/order.md)
     */
    'import/order': RuleEntry;
    /**
     * ## [import/prefer-default-export](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/prefer-default-export.md)
     */
    'import/prefer-default-export': RuleEntry;
    /**
     * ## [import/unambiguous](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/unambiguous.md)
     */
    'import/unambiguous': RuleEntry;
}

export default ImportRules;
