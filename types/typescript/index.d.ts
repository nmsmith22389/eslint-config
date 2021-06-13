import { Linter } from 'types/eslint';
// import { ESLintRules } from 'eslint/rules/index';
import { Options as ArrayTypeOptions } from './Options/ArrayType';
import { Options as BanTsCommentOptions } from './Options/BanTsComment';
import { Options as BanTypesOptions } from './Options/BanTypes';
import { Options as BraceStyleOptions } from './Options/BraceStyle';
import { Options as ClassLiteralPropertyStyleOptions } from './Options/ClassLiteralPropertyStyle';
import { Options as ConsistentTypeAssertionsOptions } from './Options/ConsistentTypeAssertions';
import { Options as ConsistentTypeDefinitionsOptions } from './Options/ConsistentTypeDefinitions';
import { Options as ConsistentTypeImportsOptions } from './Options/ConsistentTypeImports';
import { Options as ExplicitFunctionReturnTypeOptions } from './Options/ExplicitFunctionReturnType';

import RuleEntry = Linter.RuleEntry;
import RulesRecord = Linter.RulesRecord;

// const a: Partial<TypescriptRules> = {
//     '@typescript-eslint/brace-style': ['error', "allman", {allowSingleLine:}],
// };

// TODO: Move each rule into its own file (w/ options) so that each file has its own .md docs.
export interface TypescriptRules extends RulesRecord {
    /**
     * # Require that member overloads be consecutive (adjacent-overload-signatures)
     *
     * Grouping overloaded members together can improve readability of the code.
     *
     * ## Rule Details
     *
     * - ✔️ Recommended
     *
     * This rule aims to standardise the way overloaded members are organized.
     *
     * The following patterns are considered warnings:
     *
     * ```ts
     * declare namespace Foo {
     *   export function foo(s: string): void;
     *   export function foo(n: number): void;
     *   export function bar(): void;
     *   export function foo(sn: string | number): void;
     * }
     *
     * type Foo = {
     *   foo(s: string): void;
     *   foo(n: number): void;
     *   bar(): void;
     *   foo(sn: string | number): void;
     * };
     *
     * interface Foo {
     *   foo(s: string): void;
     *   foo(n: number): void;
     *   bar(): void;
     *   foo(sn: string | number): void;
     * }
     *
     * class Foo {
     *   foo(s: string): void;
     *   foo(n: number): void;
     *   bar(): void {}
     *   foo(sn: string | number): void {}
     * }
     *
     * export function foo(s: string): void;
     * export function foo(n: number): void;
     * export function bar(): void;
     * export function foo(sn: string | number): void;
     * ```
     *
     * The following patterns are not warnings:
     *
     * ```ts
     * declare namespace Foo {
     *   export function foo(s: string): void;
     *   export function foo(n: number): void;
     *   export function foo(sn: string | number): void;
     *   export function bar(): void;
     * }
     *
     * type Foo = {
     *   foo(s: string): void;
     *   foo(n: number): void;
     *   foo(sn: string | number): void;
     *   bar(): void;
     * };
     *
     * interface Foo {
     *   foo(s: string): void;
     *   foo(n: number): void;
     *   foo(sn: string | number): void;
     *   bar(): void;
     * }
     *
     * class Foo {
     *   foo(s: string): void;
     *   foo(n: number): void;
     *   foo(sn: string | number): void {}
     *   bar(): void {}
     * }
     *
     * export function bar(): void;
     * export function foo(s: string): void;
     * export function foo(n: number): void;
     * export function foo(sn: string | number): void;
     * ```
     *
     * ## When Not To Use It
     *
     * If you don't care about the general structure of the code, then you will not need this rule.
     *
     * ## Compatibility
     *
     * - TSLint: [adjacent-overload-signatures](https://palantir.github.io/tslint/rules/adjacent-overload-signatures/)
     */
    '@typescript-eslint/adjacent-overload-signatures': RuleEntry;

    /**
     * # Requires using either `T[]` or `Array<T>` for arrays (array-type)
     *
     * Using the same style for array definitions across your codebase makes it easier for your developers to read and understand the types.
     * ___
     * ## Rule Details
     *
     * - 🔧 Fixable
     *
     * This rule aims to standardise usage of array types within your codebase.
     * ___
     * ## Options
     *
     * ```ts
     *  type ArrayOption = 'array' | 'generic' | 'array-simple';
     *  type Options = {
     *    default: ArrayOption;
     *    readonly?: ArrayOption;
     *  };
     *
     *  const defaultOptions: Options = {
     *    default: 'array',
     *  };
     * ```
     *
     * The rule accepts an options object with the following properties:
     *
     * - `default` - sets the array type expected for mutable cases.
     * - `readonly` - sets the array type expected for readonly arrays. If this is omitted, then the value for `default` will be used.
     *
     * Each property can be set to one of three strings: `'array' | 'generic' | 'array-simple'`.
     *
     * The default config will enforce that all mutable and readonly arrays use the `'array'` syntax.
     *
     * ### `"array"`
     *
     * Always use `T[]` or `readonly T[]` for all array types.
     *
     * Incorrect code for `"array"`:
     *
     * ```ts
     *  const x: Array<string> = ['a', 'b'];
     *  const y: ReadonlyArray<string> = ['a', 'b'];
     * ```
     *
     * Correct code for `"array"`:
     *
     * ```ts
     *  const x: string[] = ['a', 'b'];
     *  const y: readonly string[] = ['a', 'b'];
     * ```
     *
     * ### `"generic"`
     *
     * Always use `Array<T>` or `ReadonlyArray<T>` for all array types.
     *
     * Incorrect code for `"generic"`:
     *
     * ```ts
     *  const x: string[] = ['a', 'b'];
     *  const y: readonly string[] = ['a', 'b'];
     * ```
     *
     * Correct code for `"generic"`:
     *
     * ```ts
     *  const x: Array<string> = ['a', 'b'];
     *  const y: ReadonlyArray<string> = ['a', 'b'];
     * ```
     *
     * ### `"array-simple"`
     *
     * Use `T[]` or `readonly T[]` for simple types (i.e. types which are just primitive names or type references).
     * Use `Array<T>` or `ReadonlyArray<T>` for all other types (union types, intersection types, object types, function types, etc).
     *
     * Incorrect code for `"array-simple"`:
     *
     * ```ts
     *  const a: (string | number)[] = ['a', 'b'];
     *  const b: ({ prop: string })[] = [{ prop: 'a' }];
     *  const c: (() => void)[] = [() => {}];
     *  const d: Array<MyType> = ['a', 'b'];
     *  const e: Array<string> = ['a', 'b'];
     *  const f: ReadonlyArray<string> = ['a', 'b'];
     * ```
     *
     * Correct code for `"array-simple"`:
     *
     * ```ts
     *  const a: Array<string | number> = ['a', 'b'];
     *  const b: Array<{ prop: string }> = [{ prop: 'a' }];
     *  const c: Array<() => void> = [() => {}];
     *  const d: MyType[] = ['a', 'b'];
     *  const e: string[] = ['a', 'b'];
     *  const f: readonly string[] = ['a', 'b'];
     * ```
     * ___
     * ## Related to
     *
     * - TSLint: [array-type](https://palantir.github.io/tslint/rules/array-type/)
     */
    '@typescript-eslint/array-type': RuleEntry<ArrayTypeOptions>;

    /**
     * # Disallows awaiting a value that is not a Promise (await-thenable)
     *
     * This rule disallows awaiting a value that is not a "Thenable" (an object which has `then` method, such as a Promise).
     * While it is valid JavaScript to await a non-`Promise`-like value (it will resolve immediately), this pattern is often a programmer error, such as forgetting to add parenthesis to call a function that returns a Promise.
     * ___
     * ## Rule Details
     *
     * - ✔️ Recommended
     * - 💭 Uses Type Information
     *
     * Examples of **incorrect** code for this rule:
     *
     * ```ts
     *  await 'value';
     *
     *  const createValue = () => 'value';
     *  await createValue();
     * ```
     *
     * Examples of **correct** code for this rule:
     *
     * ```ts
     *  await Promise.resolve('value');
     *
     *  const createValue = async () => 'value';
     *  await createValue();
     * ```
     * ___
     * ## When Not To Use It
     *
     * If you want to allow code to `await` non-Promise values.
     * This is generally not preferred, but can sometimes be useful for visual consistency.
     * ___
     * ## Related to
     *
     * - TSLint: ['await-promise'](https://palantir.github.io/tslint/rules/await-promise)
     */
    '@typescript-eslint/await-thenable': RuleEntry;

    /**
     * # Bans `// @ts-<directive>` comments from being used or requires descriptions after directive (`ban-ts-comment`)
     *
     * TypeScript provides several directive comments that can be used to alter how it processes files.
     * Using these to suppress TypeScript Compiler Errors reduces the effectiveness of TypeScript overall.
     *
     * The directive comments supported by TypeScript are:
     *
     * ```ts
     *  // @ts-expect-error
     *  // @ts-ignore
     *  // @ts-nocheck
     *  // @ts-check
     * ```
     * ___
     * ## Rule Details
     *
     * - ✔️ Recommended
     *
     * This rule lets you set which directive comments you want to allow in your codebase.
     * By default, only `@ts-check` is allowed, as it enables rather than suppresses errors.
     *
     * The configuration looks like this:
     *
     * ```ts
     *  interface Options {
     *      'ts-expect-error'?: boolean | 'allow-with-description';
     *      'ts-ignore'?: boolean | 'allow-with-description';
     *      'ts-nocheck'?: boolean | 'allow-with-description';
     *      'ts-check'?: boolean | 'allow-with-description';
     *      minimumDescriptionLength?: number;
     *  }
     *
     *  const defaultOptions: Options = {
     *      'ts-expect-error': 'allow-with-description',
     *      'ts-ignore': true,
     *      'ts-nocheck': true,
     *      'ts-check': false,
     *      minimumDescriptionLength: 3,
     *  };
     * ```
     *
     * ### `ts-expect-error`, `ts-ignore`, `ts-nocheck`, `ts-check` directives
     *
     * A value of `true` for a particular directive means that this rule will report if it finds any usage of said directive.
     *
     * For example, with the defaults above the following patterns are considered warnings:
     *
     * ```ts
     *  if (false) {
     *      // @ts-ignore: Unreachable code error
     *      console.log('hello');
     *  }
     * ```
     *
     * The following patterns are not warnings:
     *
     * ```ts
     *  if (false) {
     *      // Compiler warns about unreachable code error
     *      console.log('hello');
     *  }
     * ```
     *
     * ### `allow-with-description`
     *
     * A value of `'allow-with-description'` for a particular directive means that this rule will report if it finds a directive that does not have a description following the directive (on the same line).
     *
     * For example, with `{ 'ts-expect-error': 'allow-with-description' }` the following pattern is considered a warning:
     *
     * ```ts
     *  if (false) {
     *      // @ts-expect-error
     *      console.log('hello');
     *  }
     * ```
     *
     * The following pattern is not a warning:
     *
     * ```ts
     *  if (false) {
     *      // @ts-expect-error: Unreachable code error
     *      console.log('hello');
     *  }
     * ```
     *
     * ### `minimumDescriptionLength`
     *
     * Use `minimumDescriptionLength` to set a minimum length for descriptions when using the `allow-with-description` option for a directive.
     *
     * For example, with `{ 'ts-expect-error': 'allow-with-description', minimumDescriptionLength: 10 }` the following pattern is considered a warning:
     *
     * ```ts
     *  if (false) {
     *      // @ts-expect-error: TODO
     *      console.log('hello');
     *  }
     * ```
     *
     * The following pattern is not a warning:
     *
     * ```ts
     *  if (false) {
     *      // @ts-expect-error The rationale for this override is described in issue #1337 on GitLab
     *      console.log('hello');
     *  }
     * ```
     *
     * ___
     * ## When Not To Use It
     *
     * If you want to use all of the TypeScript directives.
     *
     * ___
     * ## Further Reading
     *
     * - TypeScript [Type Checking JavaScript Files](https://www.typescriptlang.org/docs/handbook/type-checking-javascript-files.html)
     *
     * ___
     * ## Compatibility
     *
     * - TSLint: [ban-ts-ignore](https://palantir.github.io/tslint/rules/ban-ts-ignore/)
     */
    '@typescript-eslint/ban-ts-comment': RuleEntry<BanTsCommentOptions>;

    /**
     * # Bans `// tslint:<rule-flag>` comments from being used (`ban-tslint-comment`)
     *
     * Useful when migrating from TSLint to ESLint. Once TSLint has been removed, this rule helps locate TSLint annotations (e.g. `// tslint:disable`).
     *
     * ___
     * ## Rule Details
     *
     * - 🔧 Fixable
     *
     * Examples of **incorrect** code for this rule:
     *
     * All TSLint [rule flags](https://palantir.github.io/tslint/usage/rule-flags/)
     *
     * ```js
     *  /.* tslint:disable *./
     *  /.* tslint:enable *./
     *  /.* tslint:disable:rule1 rule2 rule3... *./
     *  /.* tslint:enable:rule1 rule2 rule3... *./
     *  // tslint:disable-next-line
     *  someCode(); // tslint:disable-line
     *  // tslint:disable-next-line:rule1 rule2 rule3...
     * ```
     *
     * Examples of **correct** code for this rule:
     *
     * ```js
     *  // This is a comment that just happens to mention tslint
     * ```
     *
     * ___
     * ## When Not To Use It
     *
     * If you are still using TSLint.
     */
    '@typescript-eslint/ban-tslint-comment': RuleEntry;

    /**
     * # Bans specific types from being used (ban-types)
     *
     * This rule bans specific types and can suggest alternatives. It does not ban the
     * corresponding runtime objects from being used.
     * ___
     * ## Rule Details
     *
     * - ✔️ Recommended
     * - 🔧 Fixable
     *
     * Examples of **incorrect** code for this rule `"String": "Use string instead"`
     *
     * ```ts
     *  class Foo<F = String> extends Bar<String> implements Baz<String> {
     *    constructor(foo: String) {}
     *
     *    exit(): Array<String> {
     *      const foo: String = 1 as String;
     *    }
     *  }
     * ```
     *
     * Examples of **correct** code for this rule `"String": "Use string instead"`
     *
     * ```ts
     *  class Foo<F = string> extends Bar<string> implements Baz<string> {
     *    constructor(foo: string) {}
     *
     *    exit(): Array<string> {
     *      const foo: string = 1 as string;
     *    }
     *  }
     * ```
     * ___
     * ## Options
     *
     * ```json
     *  {
     *      "@typescript-eslint/ban-types": ["error", {
     *          "types": {
     *              // report usages of the type using the default error message
     *              "Foo": null,
     *
     *              // add a custom message to help explain why not to use it
     *              "Bar": "Don't use bar!",
     *
     *              // add a custom message, AND tell the plugin how to fix it
     *              "String": {
     *                  "message": "Use string instead",
     *                  "fixWith": "string"
     *              }
     *          }
     *      }]
     *  }
     * ```
     *
     * ### Example
     *
     * ```json
     *  {
     *    "@typescript-eslint/ban-types": [
     *      "error",
     *      {
     *        "types": {
     *          "Array": null,
     *          "Object": "Use {} instead",
     *          "String": {
     *            "message": "Use string instead",
     *            "fixWith": "string"
     *          }
     *        }
     *      }
     *    ]
     *  }
     * ```
     * ___
     * ## Compatibility
     *
     * - TSLint: [ban-types](https://palantir.github.io/tslint/rules/ban-types/)
     */
    '@typescript-eslint/ban-types': RuleEntry<BanTypesOptions>;

    /**
     * # Enforce consistent brace style for blocks (brace-style)
     *
     * ___
     * ## Rule Details
     *
     * - 🔧 Fixable
     *
     * This rule extends the base [eslint/brace-style](https://eslint.org/docs/rules/brace-style) rule.
     * It supports all options and features of the base rule.
     *
     * ___
     * ## How to use
     *
     * ```json
     *   {
     *     // note you must disable the base rule as it can report incorrect errors
     *     "brace-style": "off",
     *     "@typescript-eslint/brace-style": ["error"]
     *   }
     * ```
     *
     * ___
     * ## Options
     *
     * See [eslint/brace-style options](https://eslint.org/docs/rules/brace-style#options).
     */
    '@typescript-eslint/brace-style': RuleEntry<BraceStyleOptions>;

    /**
     * # Ensures that literals on classes are exposed in a consistent style (`class-literal-property-style`)
     *
     * When writing TypeScript applications, it's typically safe to store literal values on classes using fields with the `readonly` modifier to prevent them from being reassigned.
     * When writing TypeScript libraries that could be used by JavaScript users however, it's typically safer to expose these literals using `getter`s, since the `readonly` modifier is enforced at compile type.
     *
     * ---
     * ## Rule Details
     *
     * - 🔧 Fixable
     *
     * This rule aims to ensure that literals exposed by classes are done so consistently, in one of the two style described above.
     * By default this rule prefers the `fields` style as it means JS doesn't have to setup & teardown a function closure.
     *
     * Note that this rule only checks for constant _literal_ values (string, template string, number, bigint, boolean, regexp, null). It does not check objects or arrays, because a readonly field behaves differently to a getter in those cases. It also does not check functions, as it is a common pattern to use readonly fields with arrow function values as auto-bound methods.
     * This is because these types can be mutated and carry with them more complex implications about their usage.
     *
     * ### The `fields` style
     *
     * This style checks for any getter methods that return literal values, and requires them to be defined using fields with the `readonly` modifier instead.
     *
     * Examples of **correct** code with the `fields` style:
     *
     * ```ts
     *  /.* eslint @typescript-eslint/class-literal-property-style: ["error", "fields"] *./
     *
     *  class Mx {
     *      public readonly myField1 = 1;
     *
     *      // not a literal
     *      public readonly myField2 = [1, 2, 3];
     *
     *      private readonly ['myField3'] = 'hello world';
     *
     *      public get myField4() {
     *          return `hello from ${window.location.href}`;
     *      }
     *  }
     * ```
     *
     * Examples of **incorrect** code with the `fields` style:
     *
     * ```ts
     *  /.* eslint @typescript-eslint/class-literal-property-style: ["error", "fields"] *./
     *
     *  class Mx {
     *      public static get myField1() {
     *          return 1;
     *      }
     *
     *      private get ['myField2']() {
     *          return 'hello world';
     *      }
     *  }
     * ```
     *
     * ### The `getters` style
     *
     * This style checks for any `readonly` fields that are assigned literal values, and requires them to be defined as getters instead.
     * This style pairs well with the [`@typescript-eslint/prefer-readonly`](prefer-readonly.md) rule,
     * as it will identify fields that can be `readonly`, and thus should be made into getters.
     *
     * Examples of **correct** code with the `getters` style:
     *
     * ```ts
     *  /.* eslint @typescript-eslint/class-literal-property-style: ["error", "getters"] *./
     *
     *  class Mx {
     *      // no readonly modifier
     *      public myField1 = 'hello';
     *
     *      // not a literal
     *      public readonly myField2 = [1, 2, 3];
     *
     *      public static get myField3() {
     *          return 1;
     *      }
     *
     *      private get ['myField4']() {
     *          return 'hello world';
     *      }
     *  }
     * ```
     *
     * Examples of **incorrect** code with the `getters` style:
     *
     * ```ts
     *  /.* eslint @typescript-eslint/class-literal-property-style: ["error", "getters"] *./
     *
     *  class Mx {
     *      readonly myField1 = 1;
     *      readonly myField2 = `hello world`;
     *      private readonly myField3 = 'hello world';
     *  }
     * ```
     *
     * ___
     * ## When Not To Use It
     *
     * When you have no strong preference, or do not wish to enforce a particular style
     * for how literal values are exposed by your classes.
     */
    '@typescript-eslint/class-literal-property-style': RuleEntry<ClassLiteralPropertyStyleOptions>;

    /**
     * # Enforces consistent usage of type assertions. (consistent-type-assertions)
     *
     * ___
     * ## Rule Details
     *
     * - ✔️ Recommended
     *
     * This rule aims to standardise the use of type assertion style across the codebase.
     *
     * Type assertions are also commonly referred as "type casting" in TypeScript (even though it is technically slightly different to what is understood by type casting in other languages), so you can think of type assertions and type casting referring to the same thing. It is essentially you saying to the TypeScript compiler, "in this case, I know better than you!".
     *
     * ___
     * ## Options
     *
     * ```ts
     *   type Options =
     *     | {
     *         assertionStyle: 'as' | 'angle-bracket';
     *         objectLiteralTypeAssertions: 'allow' | 'allow-as-parameter' | 'never';
     *       }
     *     | {
     *         assertionStyle: 'never';
     *       };
     *
     *   const defaultOptions: Options = {
     *     assertionStyle: 'as',
     *     objectLiteralTypeAssertions: 'allow',
     *   };
     * ```
     *
     * ### assertionStyle
     *
     * This option defines the expected assertion style. Valid values for `assertionStyle` are:
     *
     * - `as` will enforce that you always use `... as foo`.
     * - `angle-bracket` will enforce that you always use `<foo>...`
     * - `never` will enforce that you do not do any type assertions.
     *
     * Most code bases will want to enforce not using `angle-bracket` style because it conflicts with JSX syntax, and is confusing when paired with with generic syntax.
     *
     * Some codebases like to go for an extra level of type safety, and ban assertions altogether via the `never` option.
     *
     * ### objectLiteralTypeAssertions
     *
     * Always prefer `const x: T = { ... };` to `const x = { ... } as T;` (or similar with angle brackets). The type assertion in the latter case is either unnecessary or will probably hide an error.
     *
     * The compiler will warn for excess properties with this syntax, but not missing _required_ fields. For example: `const x: { foo: number } = {};` will fail to compile, but `const x = {} as { foo: number }` will succeed.
     *
     * The const assertion `const x = { foo: 1 } as const`, introduced in TypeScript 3.4, is considered beneficial and is ignored by this option.
     *
     * Examples of **incorrect** code for `{ assertionStyle: 'as', objectLiteralTypeAssertions: 'never' }` (and for `{ assertionStyle: 'as', objectLiteralTypeAssertions: 'allow-as-parameter' }`)
     *
     * ```ts
     *   const x = { ... } as T;
     * ```
     *
     * Examples of **correct** code for `{ assertionStyle: 'as', objectLiteralTypeAssertions: 'never' }`.
     *
     * ```ts
     *   const x: T = { ... };
     *   const y = { ... } as any;
     *   const z = { ... } as unknown;
     * ```
     *
     * Examples of **correct** code for `{ assertionStyle: 'as', objectLiteralTypeAssertions: 'allow-as-parameter' }`.
     *
     * ```ts
     *   const x: T = { ... };
     *   const y = { ... } as any;
     *   const z = { ... } as unknown;
     *   foo({ ... } as T);
     *   new Clazz({ ... } as T);
     *   function foo() { throw { bar: 5 } as Foo }
     * ```
     *
     * ___
     * ## When Not To Use It
     *
     * If you do not want to enforce consistent type assertions.
     *
     * ___
     * ## Compatibility
     *
     * - TSLint: [no-angle-bracket-type-assertion](https://palantir.github.io/tslint/rules/no-angle-bracket-type-assertion/)
     * - TSLint: [no-object-literal-type-assertion](https://palantir.github.io/tslint/rules/no-object-literal-type-assertion/)
     */
    '@typescript-eslint/consistent-type-assertions': RuleEntry<ConsistentTypeAssertionsOptions>;

    /**
     * Consistent with type definition either interface or type.
     *
     * - *Fixable*
     */
    '@typescript-eslint/consistent-type-definitions': RuleEntry<ConsistentTypeDefinitionsOptions>;

    /**
     * Enforces consistent usage of type imports.
     *
     * - *Fixable*
     */
    '@typescript-eslint/consistent-type-imports': RuleEntry<ConsistentTypeImportsOptions>;

    /**
     * Require explicit return types on functions and class methods.
     *
     * - *Recommended*
     */
    '@typescript-eslint/explicit-function-return-type': RuleEntry<ExplicitFunctionReturnTypeOptions>;

    /**
     * Require explicit accessibility modifiers on class properties and methods.
     */
    '@typescript-eslint/explicit-member-accessibility': RuleEntry;

    /**
     * Require explicit return and argument types on exported functions' and classes' public class methods.
     *
     * - *Recommended*
     */
    '@typescript-eslint/explicit-module-boundary-types': RuleEntry;

    /**
     * Enforces naming of generic type variables.
     */
    '@typescript-eslint/generic-type-naming': RuleEntry;

    /**
     * Enforce consistent indentation.
     *
     * - *Fixable*
     */
    '@typescript-eslint/indent': RuleEntry;

    /**
     * Require that interface names should or should not prefixed with I.
     *
     * - *Recommended*
     */
    '@typescript-eslint/interface-name-prefix': RuleEntry;

    /**
     * Require a specific member delimiter style for interfaces and type literals.
     *
     * - *Fixable*
     * - *Recommended*
     */
    '@typescript-eslint/member-delimiter-style': RuleEntry;

    /**
     * Enforces naming conventions for class members by visibility.
     */
    '@typescript-eslint/member-naming': RuleEntry;

    /**
     * Require a consistent member declaration order.
     */
    '@typescript-eslint/member-ordering': RuleEntry;

    /**
     * Disallow generic Array constructors.
     *
     * - *Fixable*
     * - *Recommended*
     */
    '@typescript-eslint/no-array-constructor': RuleEntry;

    /**
     * Bans usage of the delete operator with computed key expressions.
     *
     * - *Fixable*
     */
    '@typescript-eslint/no-dynamic-delete': RuleEntry;

    /**
     * Disallow empty functions.
     *
     * - *Recommended*
     */
    '@typescript-eslint/no-empty-function': RuleEntry;

    /**
     * Disallow the declaration of empty interfaces.
     *
     * - *Recommended*
     */
    '@typescript-eslint/no-empty-interface': RuleEntry;

    /**
     * Disallow usage of the any type.
     *
     * - *Fixable*
     * - *Recommended*
     */
    '@typescript-eslint/no-explicit-any': RuleEntry;

    /**
     * Disallow unnecessary parentheses.
     *
     * - *Fixable*
     */
    '@typescript-eslint/no-extra-parens': RuleEntry;

    /**
     * Forbids the use of classes as namespaces.
     */
    '@typescript-eslint/no-extraneous-class': RuleEntry;

    /**
     * Requires Promise-like values to be handled appropriately.
     *
     * - *Uses Type Information*
     */
    '@typescript-eslint/no-floating-promises': RuleEntry;

    /**
     * Disallow iterating over an array with a for-in loop.
     *
     * - *Uses Type Information*
     * - *Recommended*
     */
    '@typescript-eslint/no-for-in-array': RuleEntry;

    /**
     * Disallows explicit type declarations for variables or parameters initialized to a number, string, or boolean.
     *
     * - *Fixable*
     * - *Recommended*
     */
    '@typescript-eslint/no-inferrable-types': RuleEntry;

    /**
     * Disallows magic numbers.
     */
    '@typescript-eslint/no-magic-numbers': RuleEntry;

    /**
     * Enforce valid definition of new and constructor.
     *
     * - *Recommended*
     */
    '@typescript-eslint/no-misused-new': RuleEntry;

    /**
     * Avoid using promises in places not designed to handle them.
     *
     * - *Uses Type Information*
     * - *Recommended*
     */
    '@typescript-eslint/no-misused-promises': RuleEntry;

    /**
     * Disallow the use of custom TypeScript modules and namespaces.
     *
     * - *Recommended*
     */
    '@typescript-eslint/no-namespace': RuleEntry;

    /**
     * Disallows non-null assertions using the ! postfix operator.
     *
     * - *Recommended*
     */
    '@typescript-eslint/no-non-null-assertion': RuleEntry;

    /**
     * Disallow the use of parameter properties in class constructors.
     */
    '@typescript-eslint/no-parameter-properties': RuleEntry;

    /**
     * Disallows invocation of require().
     */
    '@typescript-eslint/no-require-imports': RuleEntry;

    /**
     * Disallow aliasing this.
     *
     * - *Recommended*
     */
    '@typescript-eslint/no-this-alias': RuleEntry;

    /**
     * Disallow the use of type aliases.
     */
    '@typescript-eslint/no-type-alias': RuleEntry;

    /**
     * Prevents conditionals where the type is always truthy or always falsy.
     *
     * - *Uses Type Information*
     */
    '@typescript-eslint/no-unnecessary-condition': RuleEntry;

    /**
     * Warns when a namespace qualifier is unnecessary.
     *
     * - *Uses Type Information*
     * - *Fixable*
     */
    '@typescript-eslint/no-unnecessary-qualifier': RuleEntry;

    /**
     * Warns if an explicitly specified type argument is the default for that type parameter.
     *
     * - *Uses Type Information*
     * - *Fixable*
     */
    '@typescript-eslint/no-unnecessary-type-arguments': RuleEntry;

    /**
     * Warns if a type assertion does not change the type of an expression.
     *
     * - *Uses Type Information*
     * - *Fixable*
     * - *Recommended*
     */
    '@typescript-eslint/no-unnecessary-type-assertion': RuleEntry;

    /**
     * Requires that all public method arguments and return type will be explicitly typed.
     */
    '@typescript-eslint/no-untyped-public-signature': RuleEntry;

    /**
     * Disallow unused expressions.
     */
    '@typescript-eslint/no-unused-expressions': RuleEntry;

    /**
     * Disallow unused variables.
     *
     * - *Recommended*
     */
    '@typescript-eslint/no-unused-vars': RuleEntry;

    /**
     * Disallow the use of variables before they are defined.
     *
     * - *Recommended*
     */
    '@typescript-eslint/no-use-before-define': RuleEntry;

    /**
     * Disallow unnecessary constructors.
     */
    '@typescript-eslint/no-useless-constructor': RuleEntry;

    /**
     * Disallows the use of require statements except in import statements.
     *
     * - *Recommended*
     */
    '@typescript-eslint/no-var-requires': RuleEntry;

    /**
     * Prefer a 'for-of' loop over a standard 'for' loop if the index is only used to access the array being iterated.
     */
    '@typescript-eslint/prefer-for-of': RuleEntry;

    /**
     * Use function types instead of interfaces with call signatures.
     *
     * - *Fixable*
     */
    '@typescript-eslint/prefer-function-type': RuleEntry;

    /**
     * Enforce includes method over indexOf method.
     *
     * - *Uses Type Information*
     * - *Fixable*
     * - *Recommended*
     */
    '@typescript-eslint/prefer-includes': RuleEntry;

    /**
     * Require the use of the namespace keyword instead of the module keyword to declare custom TypeScript modules.
     *
     * - *Fixable*
     * - *Recommended*
     */
    '@typescript-eslint/prefer-namespace-keyword': RuleEntry;

    /**
     * Requires that private members are marked as readonly if they're never modified outside of the constructor.
     *
     * - *Uses Type Information*
     * - *Fixable*
     */
    '@typescript-eslint/prefer-readonly': RuleEntry;

    /**
     * Prefer RegExp#exec() over String#match() if no global flag is provided.
     *
     * - *Uses Type Information*
     * - *Recommended*
     */
    '@typescript-eslint/prefer-regexp-exec': RuleEntry;

    /**
     * Enforce the use of String#startsWith and String#endsWith instead of other equivalent methods of checking substrings.
     *
     * - *Uses Type Information*
     * - *Fixable*
     * - *Recommended*
     */
    '@typescript-eslint/prefer-string-starts-ends-with': RuleEntry;

    /**
     * Requires any function or method that returns a Promise to be marked async.
     *
     * - *Uses Type Information*
     */
    '@typescript-eslint/promise-function-async': RuleEntry;

    /**
     * Enforce the consistent use of either backticks, double, or single quotes.
     *
     * - *Fixable*
     */
    '@typescript-eslint/quotes': RuleEntry;

    /**
     * Enforce giving compare argument to Array#sort.
     *
     * - *Uses Type Information*
     */
    '@typescript-eslint/require-array-sort-compare': RuleEntry;

    /**
     * Disallow async functions which have no await expression.
     *
     * - *Uses Type Information*
     * - *Recommended*
     */
    '@typescript-eslint/require-await': RuleEntry;

    /**
     * When adding two variables, operands must both be of type number or of type string.
     *
     * - *Uses Type Information*
     */
    '@typescript-eslint/restrict-plus-operands': RuleEntry;

    /**
     * Require or disallow semicolons instead of ASI.
     *
     * - *Fixable*
     */
    '@typescript-eslint/semi': RuleEntry;

    /**
     * enforce consistent spacing before function definition opening parenthesis.
     *
     * - *Fixable*
     */
    '@typescript-eslint/space-before-function-paren': RuleEntry;

    /**
     * Restricts the types allowed in boolean expressions.
     *
     * - *Uses Type Information*
     */
    '@typescript-eslint/strict-boolean-expressions': RuleEntry;

    /**
     * Sets preference level for triple slash directives versus
     * ES6-style import declarations.
     *
     * - *Recommended*
     */
    '@typescript-eslint/triple-slash-reference': RuleEntry;

    /**
     * Require consistent spacing around type annotations.
     *
     * - *Fixable*
     * - *Recommended*
     */
    '@typescript-eslint/type-annotation-spacing': RuleEntry;

    /**
     * Requires type annotations to exist.
     */
    '@typescript-eslint/typedef': RuleEntry;

    /**
     * Enforces unbound methods are called with their expected scope.
     *
     * - *Uses Type Information*
     * - *Recommended*
     */
    '@typescript-eslint/unbound-method': RuleEntry;

    /**
     * Warns for any two overloads that could be unified into one by.
     * using a union or an optional/rest parameter.
     */
    '@typescript-eslint/unified-signatures': RuleEntry;
}

export default TypescriptRules;
