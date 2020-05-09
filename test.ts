/* eslint-disable @typescript-eslint/ban-ts-ignore */
//@ts-ignore
import { Linter } from './node_modules/eslint';
import { Rule, Linter as LinterType } from './types/eslint';
import ESLintRules from './types/eslint/rules';

const Linters = new Linter() as LinterType;
const rulesMap = Linters.getRules() as Map<keyof ESLintRules, Rule.RuleModule>;

const rules: Record<string, 'off'> = {};

rulesMap.forEach((_val, key) => {
    rules[key] = 'off';
});
console.dir(rules);
