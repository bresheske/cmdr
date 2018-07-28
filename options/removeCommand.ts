import { DB } from "../services/db";

export async function removeCommand(command:string, db?:DB) {
    db = db || new DB();
    let saved = await db.load();
    let i = saved.findIndex(c => c.name === command);
    if (i >= 0) {
        saved.splice(i, 1);
        db.save(saved);
    }
};