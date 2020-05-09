export type Options = [
    Partial<{
        types: {
            [k: string]:
                | string
                | {
                      message: string;
                      fixWith: string;
                  }
                | null;
        };
    }>
];

export default Options;
