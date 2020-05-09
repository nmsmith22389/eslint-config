type Options = [
    {
        /**
         * The maximum number of dependencies allowed.
         *
         * Anything over will trigger the rule.
         *
         * **Default is 10** if the rule is enabled and no `max` is specified.
         *
         * @default 10
         */
        max?: number;
    }
];

// const defaultOptions: Options = [
//     {
//         max: 10,
//     },
// ];

export { Options, /* defaultOptions, */ Options as default };
