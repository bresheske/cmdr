import { expect } from "chai";
import { DB } from "../services/db";
import { Command } from "../objects/command";
import { runCommand } from "../options/runCommand";
import { parseCommand } from "../options/parseCommand";

describe('Command Arguments', () => {
    const db = new DB();
    db.DATA_FILE = "./test.json";

    beforeEach(async() => {
        await db.delete();
        await db.save([
            { name: 'hello', command: 'echo' } as Command
        ] as Array<Command>);
    });

    it('should pass arguments to commands', async() => {
        let res = await runCommand('hello', 'hello', db);
        expect(res).equal('hello\r\n');
        res = await runCommand('hello', 'kitten', db);
        expect(res).equal('kitten\r\n');
    });

    it('should pass no arguments to commands', async() => {
        let res = await runCommand('hello', undefined, db);
    });

    it('should parse $param arguments', async() => {
        let res = await parseCommand('echo $1 > $2', 'hello temp.txt');
        expect(res).equal('echo hello > temp.txt');
    });

    it('should parse no $param arguments', async() => {
        let res = await parseCommand('echo hi', '');
        expect(res).equal('echo hi');
    });

});