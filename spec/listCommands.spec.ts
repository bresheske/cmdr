import { expect } from "chai";
import { DB } from "../services/db";
import { Command } from "../objects/command";
import { listCommands } from "../options/listCommands";

describe('List Commands', () => {
    const db = new DB();
    db.DATA_FILE = "./test.json";

    beforeEach(async() => {
        await db.delete();
        await db.save([
            { name: 'ls', command: 'dir' } as Command
        ] as Array<Command>);
    });

    it('should list commands', async() => {
        let commands = await listCommands(db);
        expect(commands.length).equal(1);
    });

});