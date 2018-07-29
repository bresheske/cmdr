import { exec } from "child_process"

export async function execute(command:string, params?:string):Promise<string> {
    return new Promise<string>((res, rej) => {
        let cwd = process.cwd();
        let cmd = params
            ? `${command} ${params}`
            : command;
        exec(cmd, { cwd: cwd }, (err, out, stderr) => {
            if (err)
                rej(err);
            else if (stderr)
                rej(Error(stderr));
            else
                res(out);
        });
    });
}