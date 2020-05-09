type Options = [
    {
        allowArray?: boolean;
        allowArrowFunction?: boolean;
        allowAnonymousClass?: boolean;
        allowAnonymousFunction?: boolean;
        allowCallExpression?: boolean;
        allowLiteral?: boolean;
        allowObject?: boolean;
    }?
];

// const defaultOptions: Options = [
//     {
//         allowArray: false,
//         allowArrowFunction: false,
//         allowAnonymousClass: false,
//         allowAnonymousFunction: false,
//         allowCallExpression: true, // The true value here is for backward compatibility
//         allowLiteral: false,
//         allowObject: false,
//     },
// ];

export { Options, /* defaultOptions, */ Options as default };
