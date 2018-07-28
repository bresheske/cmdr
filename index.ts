import { saveNewCommand } from "./options/saveNewCommand";
import { removeCommand } from "./options/removeCommand";
import { runCommands } from "./options/runCommands";
import { listCommands } from "./options/listCommands";

const argv = require('minimist')(process.argv.slice(2));

(async(args) => {
    const savenew = args.s;
    const remove = args.r;
    const commands:Array<string> = args._;

    if (savenew) {
        await saveNewCommand(savenew, commands);
    }
    else if (remove) {
        await removeCommand(remove);
    }
    else if(commands && commands.length > 0) {
        let res = await runCommands(commands);
        for (let r of res)
            console.log(r);
    }
    else {
        let comms = await listCommands();
        for (let c of comms)
            console.log(c);
    }
    
})(argv);