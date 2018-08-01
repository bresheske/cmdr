import { cmdr } from "./options/cmdr";
(async() => {
    console.log(await cmdr(process.argv.slice(2)));
})();