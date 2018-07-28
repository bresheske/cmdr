import { DB } from "../services/db";
import { execute } from "../services/execute";

export async function runCommands(commands:Array<string>, db?:DB):Promise<Array<string>> {
    db = db || new DB();
    let out: Array<string> = [];
    for (let c of commands) {
        let saved = await db.load();
        let cmd = saved.find(a => a.name === c);
        if (!cmd) {
            out.push(`No command named '${c}' found.`);
        }
        else {
            try {
                let result = await execute(cmd.command);
                out.push(result);
            }
            catch (e) {
                throw (e);
            }
        }
    }
    return out;
};