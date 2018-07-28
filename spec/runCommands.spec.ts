import { expect, assert } from "chai";
import { DB } from "../services/db";
import { Command } from "../objects/command";
import { runCommands } from "../options/runCommands";
import { listCommands } from "../options/listCommands";
import { saveNewCommand } from "../options/saveNewCommand";

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
        let res:boolean;
        try
        {
            let result = await runCommands(['ls'], db);
            res = true;
        }
        catch {
            res = false;
        }
        assert(res);
    });

    it('should fail bad command', async() => {
        let res:boolean;
        try {
            let result = await runCommands(['11111'], db);
            res = result.some(s => s.startsWith('No command'));
        }
        catch {
            res = false;
        }
        assert(res);
    });

    it('should throw bad command', async() => {
        let res:boolean;
        try {
            await saveNewCommand('hi', ['hi'], db);
            await runCommands(['hi'], db);
            res = false;
        }
        catch {
            res = true;
        }
        assert(res);
    });

    it('should error good command', async() => {
        let res:boolean;
        try {
            await saveNewCommand('hi', ['del hi'], db);
            await runCommands(['hi'], db);
            res = false;
        }
        catch {
            res = true;
        }
        assert(res);
    });

});