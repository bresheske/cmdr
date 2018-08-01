import { EOL } from 'os';

export async function helpCommand(): Promise<string> {
    return ''
        + `cmdr: easy custom commands and execution${EOL}`
        + `${EOL}`
        + `c <no arguments> : lists all commands saved${EOL}`
        + `c <command name> <optional arguments> : executes listed command${EOL}`
        + `c -s <command name> <command> : saves a new command${EOL}`
        + `c -r <command name> : removes a saved command${EOL}`
        + `c -n <command name> <new command name> : renames a saved command${EOL}`
        + `${EOL}`
        + `that is all.${EOL}`;
}