import { DB } from "../services/db";
import { Command } from "../objects/command";

export async function saveNewCommand(name:string, commands:Array<string>, db?:DB) {
    db = db || new DB();
    let saved = await db.load();
    let i = saved.findIndex(c => c.name === name);
    let cmd: Command = { name: name, command: commands[0] };
    if (i >= 0)
        saved[i] = cmd
    else
        saved.push(cmd);
    
    await db.save(saved);
};