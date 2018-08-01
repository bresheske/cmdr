import { saveNewCommand } from "./options/saveNewCommand";
import { removeCommand } from "./options/removeCommand";
import { runCommand } from "./options/runCommand";
import { listCommands } from "./options/listCommands";
import { renameCommand } from "./options/renameCommand";
import { helpCommand } from "./options/helpCommand";
import { Args } from "./objects/args";

const argv = require('minimist')(process.argv.slice(2));

(async(args) => {
    const a:Args = {
        save: args.s,
        commands: args._,
        help: args.h,
        remove: args.r,
        rename: args.n
    };

    if (a.save) {
        await saveNewCommand(a.save, a.commands[0]);
    }
    else if (a.remove) {
        await removeCommand(a.remove);
    }
    else if (a.rename) {
        await renameCommand(a.rename, a.commands[0]);
    }
    else if(a.commands && a.commands.length > 0) {
        let cmd = a.commands[0];
        let params = a.commands.slice(1).join(" ");
        let res = await runCommand(cmd, params);
        console.log(res);
    }
    else if (a.help) {
        let helpstr = await helpCommand();
        console.log(helpstr);
    }
    else {
        let comms = await listCommands();
        for (let c of comms)
            console.log(c);
    }
    
})(argv);