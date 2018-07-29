import { saveNewCommand } from "./options/saveNewCommand";
import { removeCommand } from "./options/removeCommand";
import { runCommand } from "./options/runCommand";
import { listCommands } from "./options/listCommands";
import { renameCommand } from "./options/renameCommand";

const argv = require('minimist')(process.argv.slice(2));

(async(args) => {
    const savenew = args.s;
    const remove = args.r;
    const rename = args.n;
    const commands:Array<string> = args._;

    if (savenew) {
        await saveNewCommand(savenew, commands);
    }
    else if (remove) {
        await removeCommand(remove);
    }
    else if (rename) {
        await renameCommand(rename, commands[0]);
    }
    else if(commands && commands.length > 0) {
        let cmd = commands[0];
        let params = commands.slice(1).join(" ");
        let res = await runCommand(cmd, params);
        console.log(res);
    }
    else {
        let comms = await listCommands();
        for (let c of comms)
            console.log(c);
    }
    
})(argv);