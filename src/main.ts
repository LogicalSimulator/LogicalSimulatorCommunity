import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import AddAddCommand from "./commands/add";
import AddAddBlogCommand from "./commands/addBlog";
import AddRemoveCommand from "./commands/remove";

let yarg = yargs(hideBin(process.argv));

for (const adder of [AddAddCommand, AddRemoveCommand, AddAddBlogCommand]) {
  yarg = adder(yarg);
}

yarg = yarg.help();
yarg.parseSync();
