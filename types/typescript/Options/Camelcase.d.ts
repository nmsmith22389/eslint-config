type Options = [
    Partial<{
        /**
         * @default 'never'
         */
        properties: 'always' | 'never';
        /**
         * @default 'never'
         */
        genericType: 'always' | 'never';
        /**
         * @default false
         */
        ignoreDestructuring: boolean;
        /**
         * @remarks
         * Also accept for regular expression patterns
         */
        allow: string[];
    }>
];

// const defaultOptions: Options = [
//     {
//         properties: 'never',
//         genericType: 'never',
//         ignoreDestructuring: false,
//     },
// ];

export { Options, /* defaultOptions, */ Options as default };
