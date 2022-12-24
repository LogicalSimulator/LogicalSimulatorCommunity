import fs from "fs";

interface PathToCheck {
  path: string;
  mustExist: boolean;
}

export function checkPaths(
  paths: PathToCheck[],
  forceWrite?: boolean | undefined
): void {
  for (const path of paths) {
    console.log(
      `Testing for ${path.mustExist ? "existance" : "nonexistance"} of path ${
        path.path
      }`
    );
    if (path.mustExist) {
      if (!fs.existsSync(path.path)) {
        console.error(`${path.path} does not exist!`);
        process.exit(1);
      }
    } else {
      if (fs.existsSync(path.path)) {
        if (forceWrite) {
          console.warn(`${path.path} already exists, will be overwritten!`);
        } else {
          console.error(`${path.path} already exists!`);
          process.exit(1);
        }
      }
    }
  }
}

export function createEmptyFiles(paths: string[]): void {
  for (const path of paths) {
    console.log(`Creating empty file ${path}`);
    fs.writeFileSync(path, "");
  }
}

export function createDirectory(
  path: string,
  force?: boolean | undefined
): void {
  if (fs.existsSync(path)) {
    if (force) {
      console.warn(`Force option used, removing directory ${path}`);
      fs.rmdirSync(path, { recursive: true });
    } else {
      console.error(`${path} already exists!`);
      process.exit(1);
    }
  }
  fs.mkdirSync(path);
}
