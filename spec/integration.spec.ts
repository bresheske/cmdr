import { cmdr } from "../options/cmdr";
import { expect } from "chai";
import { DB } from "../services/db";
import { Command } from "../objects/command";

describe('Integration Tests', async() => {
    const db = new DB();
    db.DATA_FILE = "./test.json";

    beforeEach(async() => {
        await db.delete();
        await db.save([
            { name: 'hello', command: 'echo' } as Command
        ] as Array<Command>);
    });

    it('should display help menu', async() => {
        let argv = ['-h'];
        let res = await cmdr(argv);
        expect(res).contains('cmdr: easy custom commands and execution');
    });

    it('should save new command', async() => {
        let argv = ['-s', 'ls', 'dir'];
        let res = await cmdr(argv, db);
        argv = [];
        res = await cmdr(argv, db);
        expect(res).contains('ls');
    });

    it('should update command', async() => {
        let argv = ['-s', 'ls', 'dir'];
        let res = await cmdr(argv, db);

        argv = ['-s', 'ls', 'test'];
        await cmdr(argv, db);
        
        argv = [];
        res = await cmdr(argv, db);
        expect(res).not.contains('dir');
        expect(res).contains('test');
    });

    it('should remove command', async() => {
        let argv = ['-r', 'hello'];
        let res = await cmdr(argv, db);
        argv = [];
        res = await cmdr(argv, db);
        expect(res).not.contains('hello');
    });

    it('should rename command', async() => {
        let argv = ['-n', 'hello', 'hi'];
        let res = await cmdr(argv, db);
        argv = [];
        res = await cmdr(argv, db);
        expect(res).not.contains('hello');
        expect(res).contains('hi');
    });

    it('should run command', async() => {
        let argv = ['hello', 'hi'];
        let res = await cmdr(argv, db);
        expect(res).contains('hi');
    });
});