import yargs, { boolean, string } from "yargs";
import { hideBin } from "yargs/helpers";
import fs from "fs";
import path from "path";
import { checkPaths, createEmptyFiles, createDirectory } from "./pathing";

interface ProgramArguments {
  type: "example" | "community";
  key: string;
  name: string;
  author: string;
  githubProfileURL: string | undefined;
  originalPostURL: string | undefined;
  // description: string | undefined;
  // save: string;
  force: boolean | undefined;
}

const args: ProgramArguments = yargs(hideBin(process.argv))
  .options({
    type: {
      choices: ["example", "community"] as const,
      alias: ["t"],
      demandOption: true,
    },
    key: { type: "string", alias: ["k"], demandOption: true },
    name: { type: "string", alias: ["n"], demandOption: true },
    author: { type: "string", alias: ["a"], demandOption: true },
    githubProfileURL: { type: "string" },
    originalPostURL: { type: "string" },
    // description: { type: "string", alias: ["d"] },
    // save: { type: "string", alias: ["s"], demandOption: true },
    force: { type: "boolean", alias: ["f"] },
  })
  .parseSync();

console.log(
  `Arguments received: ${(() => {
    let result = "{";
    for (const [key, value] of Object.entries(args)) {
      result += ` ${key}: ${value} `;
    }
    result += "}";
    return result;
  })()}`
);

const cwd = process.cwd();
console.log(`Current working directory: ${cwd}`);

const typeDirPath = path.join(cwd, "circuits", args.type);
const allJSONPath = path.join(typeDirPath, "all.json");
const newSavePath = path.join(typeDirPath, "saves", args.key + ".txt");
const metadataDirPath = path.join(typeDirPath, "metadata", args.key);
const infoPath = path.join(metadataDirPath, "info.json");
const descriptionPath = path.join(metadataDirPath, "description.html");

checkPaths(
  [
    { path: allJSONPath, mustExist: true },
    { path: newSavePath, mustExist: false },
    { path: metadataDirPath, mustExist: false },
  ],
  args.force
);

createDirectory(metadataDirPath, args.force);
createEmptyFiles([newSavePath, descriptionPath]);

console.info("Done!");
console.info(`Copy the description to ${descriptionPath}`);
console.info(`Copy the save code to ${newSavePath}`);

process.exit(0);
