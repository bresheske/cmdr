import { exec } from "child_process"

export async function execute(command:string):Promise<string> {
    return new Promise<string>((res, rej) => {
        let cwd = process.cwd();
        exec(command, { cwd: cwd }, (err, out, stderr) => {
            if (err)
                rej(err);
            else if (stderr)
                rej(Error(stderr));
            else
                res(out);
        });
    });
}