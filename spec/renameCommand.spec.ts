import { assert } from "chai";
import { DB } from "../services/db";
import { Command } from "../objects/command";
import { listCommands } from "../options/listCommands";
import { renameCommand } from "../options/renameCommand";

describe('Rename Commands', () => {
    const db = new DB();
    db.DATA_FILE = "./test.json";

    beforeEach(async() => {
        await db.delete();
        await db.save([
            { name: 'ls', command: 'dir' } as Command
        ] as Array<Command>);
    });

    it('should rename commands', async() => {
        await renameCommand('ls', 'hi', db);
        let commands = await listCommands(db);
        assert(commands.some(c => c.startsWith('hi')));
    });

});