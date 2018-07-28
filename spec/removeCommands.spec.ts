import { expect } from "chai";
import { DB } from "../services/db";
import { Command } from "../objects/command";
import { removeCommand } from "../options/removeCommand"
import { listCommands } from "../options/listCommands";

describe('Remove Commands', () => {
    const db = new DB();
    db.DATA_FILE = "./test.json";

    beforeEach(async() => {
        await db.delete();
        await db.save([
            { name: 'ls', command: 'dir' } as Command
        ] as Array<Command>);
    });

    it('should remove command', async() => {
        let commands = await listCommands(db);
        expect(commands.length).equal(1);
        await removeCommand('ls', db);
        commands = await listCommands(db);
        expect(commands.length).equal(0);
    });

});