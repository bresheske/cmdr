import { DB } from "../services/db";

export async function listCommands(db?:DB): Promise<Array<string>> {
    db = db || new DB();
    let saved = await db.load();
    let messages = saved.map((s) => `${s.name}:${s.command}`);
    return messages;
};