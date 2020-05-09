type Options = [
    Partial<{
        /**
         * If true, only functions which are part of a declaration will be checked.
         *
         * @default false
         */
        allowExpressions?: boolean;
        /**
         * If true, type annotations are also allowed on the variable of a function expression rather than on the function directly.
         *
         * @default true
         */
        allowTypedFunctionExpressions?: boolean;
        /**
         * If true, functions immediately returning another function expression will not be checked.
         *
         * @default true
         */
        allowHigherOrderFunctions?: boolean;
    }>
];

// const defaultOptions: Options = [
//     {
//         allowExpressions: false,
//         allowTypedFunctionExpressions: true,
//         allowHigherOrderFunctions: true,
//     },
// ];

export { Options, /* defaultOptions, */ Options as default };
