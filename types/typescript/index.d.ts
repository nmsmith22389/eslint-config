import { Linter } from 'types/eslint';
// import { ESLintRules } from 'eslint/rules/index';
import { Options as ArrayTypeOptions } from './Options/ArrayType';
import { Options as BanTypesOptions } from './Options/BanTypes';
import { Options as BraceStyleOptions } from './Options/BraceStyle';
import { Options as CamelcaseOptions } from './Options/Camelcase';
import { Options as ClassNameCasingOptions } from './Options/ClassNameCasing';
import { Options as ConsistentTypeAssertionsOptions } from './Options/ConsistentTypeAssertions';
import { Options as ConsistentTypeDefinitionsOptions } from './Options/ConsistentTypeDefinitions';
import { Options as ExplicitFunctionReturnTypeOptions } from './Options/ExplicitFunctionReturnType';

import RuleEntry = Linter.RuleEntry;
// const a: Partial<TypescriptRules> = {
//     '@typescript-eslint/brace-style': ['error', "allman", {allowSingleLine:}],
// };

// TODO: Move each rule into its own file (w/ options) so that each file has its own .md docs.

export interface TypescriptRules extends Linter.RulesRecord {
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
     * # Bans "// @ts-ignore" comments from being used (ban-ts-ignore)
     *
     * Suppressing Typescript Compiler Errors can be hard to discover.
     * ___
     * ## Rule Details
     *
     * - ✔️ Recommended
     *
     * Does not allow the use of `// @ts-ignore` comments.
     *
     * The following patterns are considered warnings:
     *
     * ```ts
     *  if (false) {
     *    // @ts-ignore: Unreachable code error
     *    console.log('hello');
     *  }
     * ```
     *
     * The following patterns are not warnings:
     *
     * ```ts
     *  if (false) {
     *    // Compiler warns about unreachable code error
     *    console.log('hello');
     *  }
     * ```
     * ___
     * ## When Not To Use It
     *
     * If you are sure, compiler errors won't affect functionality and you need to disable them.
     * ___
     * ## Further Reading
     *
     * - TypeScript [Type Checking JavaScript Files](https://www.typescriptlang.org/docs/handbook/type-checking-javascript-files.html)
     * ___
     * ## Compatibility
     *
     * - TSLint: [ban-ts-ignore](https://palantir.github.io/tslint/rules/ban-ts-ignore/)
     */
    '@typescript-eslint/ban-ts-ignore': RuleEntry;

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
     * # Enforce camelCase naming convention (camelcase)
     *
     * When it comes to naming variables, style guides generally fall into one of two
     * camps: camelcase (`variableName`) and underscores (`variable_name`). This rule
     * focuses on using the camelcase approach. If your style guide calls for
     * camelCasing your variable names, then this rule is for you!
     *
     * ___
     * ## Rule Details
     *
     * - ✔️ Recommended
     *
     * This rule looks for any underscores (`_`) located within the source code.
     * It ignores leading and trailing underscores and only checks those in the middle
     * of a variable name. If ESLint decides that the variable is a constant
     * (all uppercase), then no warning will be thrown. Otherwise, a warning will be
     * thrown. This rule only flags definitions and assignments but not function calls.
     * In case of ES6 `import` statements, this rule only targets the name of the
     * variable that will be imported into the local module scope.
     *
     * **_This rule was taken from the ESLint core rule `camelcase`._**
     * **_Available options and test cases may vary depending on the version of ESLint installed in the system._**
     *
     * ___
     * ## Options
     *
     * ```json
     *   {
     *     // note you must disable the base rule as it can report incorrect errors
     *     "camelcase": "off",
     *     "@typescript-eslint/camelcase": ["error", { "properties": "always" }]
     *   }
     * ```
     *
     * This rule has an object option:
     *
     * - `"properties": "never"` (default) does not check property names
     * - `"properties": "always"` enforces camelcase style for property names
     * - `"genericType": "never"` (default) does not check generic identifiers
     * - `"genericType": "always"` enforces camelcase style for generic identifiers
     * - `"ignoreDestructuring": false` (default) enforces camelcase style for destructured identifiers
     * - `"ignoreDestructuring": true` does not check destructured identifiers
     * - `allow` (`string[]`) list of properties to accept. Accept regex.
     *
     * ### properties: "always"
     *
     * Examples of **incorrect** code for this rule with the default `{ "properties": "always" }` option:
     *
     * ```js
     *   // eslint @typescript-eslint/camelcase: "error"
     *
     *   import { no_camelcased } from 'external-module';
     *
     *   var my_favorite_color = '#112C85';
     *
     *   function do_something() {
     *     // ...
     *   }
     *
     *   obj.do_something = function() {
     *     // ...
     *   };
     *
     *   function foo({ no_camelcased }) {
     *     // ...
     *   }
     *
     *   function foo({ isCamelcased: no_camelcased }) {
     *     // ...
     *   }
     *
     *   function foo({ no_camelcased = 'default value' }) {
     *     // ...
     *   }
     *
     *   var obj = {
     *     my_pref: 1,
     *   };
     *
     *   var { category_id = 1 } = query;
     *
     *   var { foo: no_camelcased } = bar;
     *
     *   var { foo: bar_baz = 1 } = quz;
     * ```
     *
     * Examples of **correct** code for this rule with the default `{ "properties": "always" }` option:
     *
     * ```js
     *   // eslint @typescript-eslint/camelcase: "error"
     *
     *   import { no_camelcased as camelCased } from 'external-module';
     *
     *   var myFavoriteColor = '#112C85';
     *   var _myFavoriteColor = '#112C85';
     *   var myFavoriteColor_ = '#112C85';
     *   var MY_FAVORITE_COLOR = '#112C85';
     *   var foo = bar.baz_boom;
     *   var foo = { qux: bar.baz_boom };
     *
     *   obj.do_something();
     *   do_something();
     *   new do_something();
     *
     *   var { category_id: category } = query;
     *
     *   function foo({ isCamelCased }) {
     *     // ...
     *   }
     *
     *   function foo({ isCamelCased: isAlsoCamelCased }) {
     *     // ...
     *   }
     *
     *   function foo({ isCamelCased = 'default value' }) {
     *     // ...
     *   }
     *
     *   var { categoryId = 1 } = query;
     *
     *   var { foo: isCamelCased } = bar;
     *
     *   var { foo: isCamelCased = 1 } = quz;
     * ```
     *
     * ### properties: "never"
     *
     * Examples of **correct** code for this rule with the `{ "properties": "never" }` option:
     *
     * ```js
     *   // eslint @typescript-eslint/camelcase: ["error", {properties: "never"}]
     *
     *   var obj = {
     *     my_pref: 1,
     *   };
     * ```
     *
     * ### genericType: "always"
     *
     * Examples of **incorrect** code for this rule with the default `{ "genericType": "always" }` option:
     *
     * ```typescript
     *   // eslint @typescript-eslint/camelcase: ["error", { "genericType": "always" }]
     *
     *   interface Foo<t_foo> {}
     *   function foo<t_foo>() {}
     *   class Foo<t_foo> {}
     *   type Foo<t_foo> = {};
     *   class Foo {
     *     method<t_foo>() {}
     *   }
     *
     *   interface Foo<t_foo extends object> {}
     *   function foo<t_foo extends object>() {}
     *   class Foo<t_foo extends object> {}
     *   type Foo<t_foo extends object> = {};
     *   class Foo {
     *     method<t_foo extends object>() {}
     *   }
     *
     *   interface Foo<t_foo = object> {}
     *   function foo<t_foo = object>() {}
     *   class Foo<t_foo = object> {}
     *   type Foo<t_foo = object> = {};
     *   class Foo {
     *     method<t_foo = object>() {}
     *   }
     * ```
     *
     * Examples of **correct** code for this rule with the default `{ "genericType": "always" }` option:
     *
     * ```typescript
     *   // eslint @typescript-eslint/camelcase: ["error", { "genericType": "always" }]
     *
     *   interface Foo<T> {}
     *   function foo<t>() {}
     *   class Foo<T> {}
     *   type Foo<T> = {};
     *   class Foo {
     *     method<T>() {}
     *   }
     *
     *   interface Foo<T extends object> {}
     *   function foo<T extends object>() {}
     *   class Foo<T extends object> {}
     *   type Foo<T extends object> = {};
     *   class Foo {
     *     method<T extends object>() {}
     *   }
     *
     *   interface Foo<T = object> {}
     *   function foo<T = object>() {}
     *   class Foo<T = object> {}
     *   type Foo<T = object> = {};
     *   class Foo {
     *     method<T = object>() {}
     *   }
     * ```
     *
     * ### genericType: "never"
     *
     * Examples of **correct** code for this rule with the `{ "genericType": "never" }` option:
     *
     * ```typescript
     *   // eslint @typescript-eslint/camelcase: ["error", { "genericType": "never" }]
     *
     *   interface Foo<t_foo> {}
     *   function foo<t_foo>() {}
     *   class Foo<t_foo> {}
     *   type Foo<t_foo> = {};
     *   class Foo {
     *     method<t_foo>() {}
     *   }
     *
     *   interface Foo<t_foo extends object> {}
     *   function foo<t_foo extends object>() {}
     *   class Foo<t_foo extends object> {}
     *   type Foo<t_foo extends object> = {};
     *   class Foo {
     *     method<t_foo extends object>() {}
     *   }
     *
     *   interface Foo<t_foo = object> {}
     *   function foo<t_foo = object>() {}
     *   class Foo<t_foo = object> {}
     *   type Foo<t_foo = object> = {};
     *   class Foo {
     *     method<t_foo = object>() {}
     *   }
     * ```
     *
     * ### ignoreDestructuring: false
     *
     * Examples of **incorrect** code for this rule with the default `{ "ignoreDestructuring": false }` option:
     *
     * ```js
     *   // eslint @typescript-eslint/camelcase: "error"
     *
     *   var { category_id } = query;
     *
     *   var { category_id = 1 } = query;
     *
     *   var { category_id: category_id } = query;
     *
     *   var { category_id: category_alias } = query;
     *
     *   var { category_id: categoryId, ...other_props } = query;
     * ```
     *
     * ### ignoreDestructuring: true
     *
     * Examples of **incorrect** code for this rule with the `{ "ignoreDestructuring": true }` option:
     *
     * ```js
     *   // eslint @typescript-eslint/camelcase: ["error", {ignoreDestructuring: true}]
     *
     *   var { category_id: category_alias } = query;
     *
     *   var { category_id, ...other_props } = query;
     * ```
     *
     * Examples of **correct** code for this rule with the `{ "ignoreDestructuring": true }` option:
     *
     * ```js
     *   // eslint @typescript-eslint/camelcase: ["error", {ignoreDestructuring: true}]
     *
     *   var { category_id } = query;
     *
     *   var { category_id = 1 } = query;
     *
     *   var { category_id: category_id } = query;
     * ```
     *
     * ### allow
     *
     * Examples of **correct** code for this rule with the `allow` option:
     *
     * ```js
     *   // eslint @typescript-eslint/camelcase: ["error", {allow: ["UNSAFE_componentWillMount"]}]
     *
     *   function UNSAFE_componentWillMount() {
     *     // ...
     *   }
     * ```
     *
     * ```js
     *   // eslint @typescript-eslint/camelcase: ["error", {allow: ["^UNSAFE_"]}]
     *
     *   function UNSAFE_componentWillMount() {
     *     // ...
     *   }
     *
     *   function UNSAFE_componentWillMount() {
     *     // ...
     *   }
     * ```
     *
     * ___
     * ## When Not To Use It
     *
     * If you have established coding standards using a different naming convention (separating words with underscores), turn this rule off.
     */
    '@typescript-eslint/camelcase': RuleEntry<CamelcaseOptions>;

    /**
     * # Require PascalCased class and interface names (class-name-casing)
     *
     * This rule enforces PascalCased names for classes and interfaces.
     *
     * ___
     * ## Rule Details
     *
     * - ✔️ Recommended
     *
     * This rule aims to make it easy to differentiate classes from regular variables at a glance.
     * The `_` prefix is sometimes used to designate a private declaration, so the rule also supports a name
     * that might be `_Example` instead of `Example`.
     *
     * ___
     * ## Options
     *
     * This rule has an object option:
     *
     * - `"allowUnderscorePrefix": false`: (default) does not allow the name to have an underscore prefix
     * - `"allowUnderscorePrefix": true`: allows the name to optionally have an underscore prefix
     *
     * ___
     * ## Examples
     *
     * Examples of **incorrect** code for this rule:
     *
     * ```ts
     *   class invalidClassName {}
     *
     *   class Another_Invalid_Class_Name {}
     *
     *   var bar = class invalidName {};
     *
     *   interface someInterface {}
     *
     *   class _InternalClass {}
     * ```
     *
     * Examples of **correct** code for this rule:
     *
     * ```ts
     *   class ValidClassName {}
     *
     *   export default class {}
     *
     *   var foo = class {};
     *
     *   interface SomeInterface {}
     *
     *   // eslint @typescript-eslint/class-name-casing: { "allowUnderscorePrefix": true }
     *   class _InternalClass {}
     * ```
     *
     * ___
     * ## When Not To Use It
     *
     * You should turn off this rule if you do not care about class name casing, or if
     * you use a different type of casing.
     *
     * ___
     * ## Further Reading
     *
     * - [`class-name`](https://palantir.github.io/tslint/rules/class-name/) in [TSLint](https://palantir.github.io/tslint/)
     */
    '@typescript-eslint/class-name-casing': RuleEntry<ClassNameCasingOptions>;

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
     * Require explicit return types on functions and class methods.
     *
     * - *Recommended*
     */
    '@typescript-eslint/explicit-function-return-type': RuleEntry<
        ExplicitFunctionReturnTypeOptions
    >;

    /**
     * Require explicit accessibility modifiers on class properties and methods.
     */
    '@typescript-eslint/explicit-member-accessibility': RuleEntry;

    /**
     * Require or disallow spacing between function identifiers and their invocations.
     *
     * - *Fixable*
     */
    '@typescript-eslint/func-call-spacing': RuleEntry;

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
