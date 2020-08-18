// FIXME: REMOVE
/* eslint-disable import/no-nodejs-modules */
import { exec, ExecException } from 'child_process';
import Path from 'path';
import chalk from 'chalk';

const configFile = Path.normalize('tsconfig.build.json');

type ExecParams = {
    error?: ExecException | null;
    stdout: string | Buffer;
    stderr?: string | Buffer;
};

const run = async (cmd: string): Promise<ExecParams> =>
    new Promise<ExecParams>((resolve) => {
        exec(cmd, (error, stdout, stderr) => resolve({ error, stdout, stderr }));
    });

console.log(chalk`{yellow Building...}`);

void run(`tsc -b ${configFile}`).then(() => {
    console.log(chalk`{green.bold Compilation Complete!}`);
});

// exec(`tsc --project ${configFile}`, (error, stdout, stderr) => {
//     console.log('Compilation complete');
// });
