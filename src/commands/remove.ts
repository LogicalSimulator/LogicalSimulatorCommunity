import fs from "fs";
import path from "path";
import yargs from "yargs";

export default function AddRemoveCommand(yarg: yargs.Argv): yargs.Argv {
  return yarg.command(
    "remove <key>",
    "Helper to remove an example, community circuit, or blog post to the Community repository.",
    {
      type: {
        alias: "t",
        desc: "The type of thing to remove.",
        choices: ["examples", "community"] as const,
        demandOption: true,
      },
    },
    (args) => {
      const cwd = process.cwd();
      const typeDirPath = path.join(cwd, "circuits", args.type);
      const allJSONPath = path.join(typeDirPath, "all.json");
      const savePath = path.join(typeDirPath, "saves", args.key + ".txt");
      const metadataDirPath = path.join(typeDirPath, "metadata", args.key + "");

      fs.rmSync(metadataDirPath, { recursive: true });
      fs.rmSync(savePath);

      const all = JSON.parse(
        fs.readFileSync(allJSONPath, { encoding: "utf8" })
      );

      let found = false;
      for (const [key, value] of Object.entries(all.allSaves)) {
        if (value === args.key) {
          all.allSaves[key] = undefined;
          found = true;
          break;
        }
      }
      if (!found) {
        console.error(`${args.key} does not exist!`);
        process.exit(1);
      }

      fs.writeFileSync(allJSONPath, JSON.stringify(all, null, 2) + "\n", {
        encoding: "utf8",
      });
    }
  );
}
