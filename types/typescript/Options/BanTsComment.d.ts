export type TsCommentOption = boolean | 'allow-with-description';
export type Options = [
    {
        'ts-expect-error'?: TsCommentOption;
        'ts-ignore'?: TsCommentOption;
        'ts-nocheck'?: TsCommentOption;
        'ts-check'?: TsCommentOption;
        minimumDescriptionLength?: number;
    }
];

export default Options;
