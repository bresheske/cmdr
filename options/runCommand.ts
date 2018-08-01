import { DB } from "../services/db";
import { execute } from "../services/execute";
import { parseCommand } from "./parseCommand";

export async function runCommand(command:string, params?:string, db?:DB):Promise<string> {
    db = db || new DB();
    let out: string;
    
    let saved = await db.load();
    let cmd = saved.find(a => a.name === command);
    if (!cmd) {
        out = `No command named '${command}' found.`;
    }
    else if (!cmd.command) {
        out = `Command '${cmd.name}' has no defined command.`;
    }
    else {
        try {
            let parsedcommand = await parseCommand(cmd.command, params);
            let result = await execute(parsedcommand, params);
            out = result;
        }
        catch (e) {
            throw (e);
        }
    }
    return out;
};