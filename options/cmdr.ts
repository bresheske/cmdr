import { Args } from "../objects/args";
import { saveNewCommand } from "./saveNewCommand";
import { removeCommand } from "./removeCommand";
import { renameCommand } from "./renameCommand";
import { runCommand } from "./runCommand";
import { helpCommand } from "./helpCommand";
import { listCommands } from "./listCommands";
import { DB } from "../services/db";

/**
 * runs commands based on input, and returns standard output.
 */
export async function cmdr(argv:Array<string>, db?:DB): Promise<string> {
    let returnstr:string = '';
    const args = require('minimist')(argv);
    const a:Args = {
        save: args.s,
        commands: args._,
        help: args.h,
        remove: args.r,
        rename: args.n
    };

    if (a.save && a.commands && a.commands.length > 0) {
        await saveNewCommand(a.save, a.commands[0], db);
    }
    else if (a.remove) {
        await removeCommand(a.remove, db);
    }
    else if (a.rename && a.commands && a.commands.length > 0) {
        await renameCommand(a.rename, a.commands[0], db);
    }
    else if(a.commands && a.commands.length > 0) {
        let cmd = a.commands[0];
        let params = a.commands.slice(1).join(" ");
        let res = await runCommand(cmd, params, db);
        returnstr = res;
    }
    else if (a.help) {
        returnstr = await helpCommand();
    }
    else {
        returnstr = (await listCommands(db))
            .join();
    }

    return returnstr;
}