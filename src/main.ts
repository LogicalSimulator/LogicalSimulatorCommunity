import fs from "fs";
import path from "path";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

yargs(hideBin(process.argv))
  .command(
    "add <key>",
    "Helper to add an example, community circuit, or blog post to the Community repository.",
    {
      type: {
        alias: "t",
        desc: "The type of thing to add.",
        choices: ["examples", "community"] as const,
        demandOption: true,
      },
      name: {
        alias: "n",
        desc: "The title of the thing to add.",
        type: "string",
        demandOption: true,
      },
      author: {
        alias: "a",
        desc: "The author of the thing.",
        type: "string",
        demandOption: true,
      },
      githubProfileURL: {
        desc: "The GitHub profile URL for the author.",
        type: "string",
      },
      originalPostURL: {
        desc: "The original post URL for example or community circuit.",
        type: "string",
      },
    },
    (args) => {
      const cwd = process.cwd();
      const typeDirPath = path.join(cwd, "circuits", args.type);
      const allJSONPath = path.join(typeDirPath, "all.json");
      const newSavePath = path.join(typeDirPath, "saves", args.key + ".txt");
      const metadataDirPath = path.join(typeDirPath, "metadata", args.key + "");
      const infoPath = path.join(metadataDirPath, "info.json");
      const descriptionPath = path.join(metadataDirPath, "description.html");

      for (const path of [
        { path: allJSONPath, mustExist: true },
        { path: newSavePath, mustExist: false },
        { path: metadataDirPath, mustExist: false },
      ]) {
        if (path.mustExist) {
          if (!fs.existsSync(path.path)) {
            console.error(`${path.path} does not exist!`);
            process.exit(1);
          }
        } else {
          if (fs.existsSync(path.path)) {
            console.error(`${path.path} already exists!`);
            process.exit(1);
          }
        }
      }

      fs.mkdirSync(metadataDirPath);

      for (const path of [newSavePath, descriptionPath]) {
        fs.writeFileSync(path, "");
      }

      const all = JSON.parse(
        fs.readFileSync(allJSONPath, { encoding: "utf8" })
      );
      if (all.allSaves[args.name + ""] != undefined) {
        console.error(`Key ${args.name} already exists!`);
        process.exit(1);
      }

      all.allSaves[args.name + ""] = args.key;
      fs.writeFileSync(allJSONPath, JSON.stringify(all, null, 2) + "\n", {
        encoding: "utf8",
      });

      const info = {
        author: {
          name: args.author,
          githubProfileURL: args.githubProfileURL,
          originalPostURL: args.originalPostURL,
        },
        save: {
          title: args.name,
        },
      };
      fs.writeFileSync(infoPath, JSON.stringify(info, null, 2) + "\n", {
        encoding: "utf8",
      });

      console.info(`Copy the description to ${descriptionPath}`);
      console.info(`Copy the save code to ${newSavePath}`);
    }
  )
  .help()
  .parseSync();
