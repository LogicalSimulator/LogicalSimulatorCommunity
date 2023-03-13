import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import AddAddCommand from "./commands/add";

AddAddCommand(yargs(hideBin(process.argv)))
  .help()
  .parseSync();
