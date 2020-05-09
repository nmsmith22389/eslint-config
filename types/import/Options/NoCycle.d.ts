type Options = [
    {
        /**
         * There is a `maxDepth` option available to prevent full expansion of
         * very deep dependency trees:
         *
         * ```js
         * // eslint import/no-cycle: [2, { maxDepth: 1 }]
         * // dep-c.js
         * import './dep-a.js'
         * ```
         *
         * ```js
         * // dep-b.js
         * import './dep-c.js'
         * export function b() {
         *     // ...
         * }
         * ```
         *
         * ```js
         * // dep-a.js
         * import { b } from './dep-b.js' // not reported as the cycle is at depth 2
         * ```
         *
         * This is not necessarily recommended, but available as a cost/benefit
         * tradeoff mechanism for reducing total project lint time, if needed.
         */
        maxDepth: number;
    }?
];

export { Options, Options as default };
