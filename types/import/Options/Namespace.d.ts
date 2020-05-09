type Options = [
    {
        /**
         * Defaults to `false`. When false, will report the following:
         *
         * ```js
         * // eslint import/namespace: [2, { allowComputed: false }]
         * import * as a from './a'
         * function f(x) {
         *     return a[x] // Unable to validate computed reference to imported namespace 'a'.
         * }
         * ```
         *
         * When set to `true`, the above computed namespace member reference is allowed, but
         * still can't be statically analyzed any further.
         *
         * @default false
         */
        allowComputed?: boolean;
    }
];

// const defaultOptions: Options = [
//     {
//         allowComputed: false,
//     },
// ];

export { Options, /* defaultOptions, */ Options as default };
