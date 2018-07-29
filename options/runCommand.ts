import { DB } from "../services/db";
import { execute } from "../services/execute";

export async function runCommand(command:string, params?:string, db?:DB):Promise<string> {
    db = db || new DB();
    let out: string;
    
    let saved = await db.load();
    let cmd = saved.find(a => a.name === command);
    if (!cmd) {
        out = `No command named '${command}' found.`;
    }
    else {
        try {
            let result = await execute(cmd.command, params);
            out = result;
        }
        catch (e) {
            throw (e);
        }
    }
    return out;
};