type ArrayOption = 'array' | 'generic' | 'array-simple';
type Options = [
    {
        /**
         * @default 'array'
         */
        default: ArrayOption;
        readonly?: ArrayOption;
    }
];

// const defaultOptions: Options = [
//     {
//         default: 'array',
//     },
// ];

export { Options, /* defaultOptions, */ Options as default };
