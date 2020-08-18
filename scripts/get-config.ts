// FIXME: REMOVE
import { exec, ExecException } from 'child_process';

type ExecParams = {
    error?: ExecException | null;
    stdout: string | Buffer;
    stderr?: string | Buffer;
};

const run = async (cmd: string) =>
    new Promise<ExecParams>((resolve) => {
        exec(cmd, (error, stdout, stderr) => resolve({ error, stdout, stderr }));
    });

const input = process.argv[2];
const file = input || 'dist/index.js';

run(`eslint --no-eslintrc --print-config ${file} --config ${file}`).then(({error, stdout, stderr}) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(stdout);
});
