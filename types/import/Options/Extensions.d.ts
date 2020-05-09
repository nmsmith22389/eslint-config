type ExtensionOption = 'always' | 'never' | 'ignorePackages';

type ExtensionList = Record<string, ExtensionOption>;
// Note: Can also be below but it adds to much type complexity.
// {
//     ignorePackages: boolean,
//     pattern: Record<string, ExtensionOption>,
// };

type Options = [ExtensionOption?] | [ExtensionList] | [ExtensionOption, ExtensionList];

// const defaultOptions: Options = ['never'];

export { Options, /* defaultOptions, */ Options as default };
