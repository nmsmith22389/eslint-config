type Options = [
    {
        /**
         * If `allowRequire` option is set to `true`, `require` calls are valid:
         *
         * ```js
         * // eslint no-commonjs: [2, { allowRequire: true }]
         * var mod = require('./mod');
         * ```
         *
         * but `module.exports` is reported as usual.
         */
        allowRequire?: boolean;

        /**
         * By default, conditional requires are allowed:
         *
         * ```js
         * const a = b && require("c");
         * if (typeof window !== "undefined") {
         *     require('that-ugly-thing');
         * }
         * let fs = null;
         * try {
         *     fs = require("fs");
         * } catch (error) {}
         * ```
         *
         * If the `allowConditionalRequire` option is set to `false`, they will
         * be reported.
         *
         * If you don't rely on synchronous module loading, check out [dynamic
         * import](https://github.com/airbnb/babel-plugin-dynamic-import-node).
         */
        allowConditionalRequire?: boolean;

        /**
         * If `allowPrimitiveModules` option is set to `true`, the following is
         * valid:
         *
         * ```js
         * // eslint no-commonjs: [2, { allowPrimitiveModules: true }]
         * module.exports = "foo"
         * module.exports = function rule(context) { return {
         *     // ...
         * }}
         * ```
         *
         * but this is still reported:
         *
         * ```js
         * // eslint no-commonjs: [2, { allowPrimitiveModules: true }]
         * module.exports = { x: "y" }
         * exports.z = function boop() {
         *     // ...
         * }
         * ```
         *
         * This is useful for things like ESLint rule modules, which must export
         * a function as the module.
         */
        allowPrimitiveModules?: boolean;
    }?
];

export { Options, Options as default };
