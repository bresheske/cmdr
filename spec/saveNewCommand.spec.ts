import { expect } from "chai";
import { DB } from "../services/db";
import { Command } from "../objects/command";
import { saveNewCommand } from "../options/saveNewCommand"
import { listCommands } from "../options/listCommands";

describe('Save New Command', () => {
    const db = new DB();
    db.DATA_FILE = "./test.json";

    beforeEach(async() => {
        await db.delete();
        await db.save([
            { name: 'ls', command: 'dir' } as Command
        ] as Array<Command>);
    });

    it('should save command', async() => {
        let commands = await listCommands(db);
        expect(commands.length).equal(1);
        await saveNewCommand('ls1', 'dir /r', db);
        commands = await listCommands(db);
        expect(commands.length).equal(2);
        expect(commands[1] === 'ls1');
    });

    it('should update command', async() => {
        let commands = await listCommands(db);
        expect(commands.length).equal(1);
        await saveNewCommand('ls', 'dir /r', db);
        commands = await listCommands(db);
        expect(commands.length).equal(1);
        expect(commands[0] === 'ls');
    });

});