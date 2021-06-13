export type Options = [
    {
        /**
         * @default 'type-imports'
         */
        prefer: 'type-imports' | 'no-type-imports';

        /**
         * @default true
         */
        disallowTypeAnnotations: boolean;
    }
];

export default Options;
