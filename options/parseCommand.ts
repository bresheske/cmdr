const split = require('split-string-words');

export async function parseCommand(command:string, params?:string): Promise<string> {
    let regex = /\$(\d+)/g;
    let match = regex.exec(command);
    let ps = params
        ? split(params)
        : [];
    while (match) {
        let index = parseInt(match[1]) - 1;
        let matchindex = index + 1;
        command = command.replace(new RegExp(`\\$${matchindex}`, 'g'), ps[index]);
        match = regex.exec(command);
    }
    return command;
}