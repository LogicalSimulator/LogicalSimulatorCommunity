import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import AddAddCommand from "./commands/add";
import AddRemoveCommand from "./commands/remove";

let yarg = yargs(hideBin(process.argv));
yarg = AddAddCommand(yarg);
yarg = AddRemoveCommand(yarg);
yarg = yarg.help();
yarg.parseSync();
