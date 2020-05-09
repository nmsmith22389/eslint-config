type Options = [
    {
        /**
         * Sets the number of newlines that are enforced after the last
         * top-level import statement or require call.
         *
         * @default 1
         */
        count?: number;
    }
];

// const defaultOptions: Options = [
//     {
//         count: 1,
//     },
// ];

export { Options, /* defaultOptions, */ Options as default };
