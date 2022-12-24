import yargs, { string } from "yargs";
import { hideBin } from "yargs/helpers";

interface ProgramArguments {
  type: "example" | "community";
  key: string;
  name: string;
  author: string;
  githubProfileURL: string | undefined;
  originalPostURL: string | undefined;
  // description: string | undefined;
  // save: string;
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
