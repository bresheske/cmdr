import * as fs from 'async-file';
import * as path from 'path';
import { Command } from "../objects/command";

export class DB {
    DATA_FILE:string = path.resolve(path.join(process.execPath, '../data.json'));

    async load(): Promise<Array<Command>> {
        let commands: Array<Command> = [];
        try {
            let str = await fs.readFile(this.DATA_FILE);
            commands = JSON.parse(str) as Array<Command>;
        }
        catch { }
        return commands;
    }

    async save(data: Array<Command>) {
        let str = JSON.stringify(data);
        await fs.writeFile(this.DATA_FILE, str);
    }

    async delete() {
        try {
            await fs.delete(this.DATA_FILE);
        }
        catch { } 
    }
}