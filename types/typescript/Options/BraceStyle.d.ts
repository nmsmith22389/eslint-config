type Options = [
    '1tbs' | 'stroustrup' | 'allman',
    Partial<{
        /**
         * @default false
         */
        allowSingleLine: boolean;
    }>
];

// const defaultOptions: Options = [
//     '1tbs',
//     {
//         allowSingleLine: false,
//     },
// ];

export { Options, /* defaultOptions, */ Options as default };
