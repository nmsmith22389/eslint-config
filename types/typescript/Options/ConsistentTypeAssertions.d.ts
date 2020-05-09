type AssertionStyle = {
    /**
     * @default 'as'
     */
    assertionStyle?: 'as' | 'angle-bracket';
    objectLiteralTypeAssertions?: 'allow' | 'allow-as-parameter' | 'never';
};

type AssertionStyleNever = {
    /**
     * @default 'as'
     */
    assertionStyle?: 'never';
};

type Options = [AssertionStyle | AssertionStyleNever];

// const defaultOptions: Options = [
//     {
//         assertionStyle: 'as',
//         objectLiteralTypeAssertions: 'allow',
//     },
// ];

export { Options, /* defaultOptions, */ Options as default };
