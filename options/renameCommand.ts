import { DB } from "../services/db";

export async function renameCommand(cmd:string, name: string, db?:DB): Promise<void> {
    db = db || new DB();
    let saved = await db.load();
    let i = saved.findIndex(a => a.name === cmd);
    saved[i].name = name;
    await db.save(saved);
};