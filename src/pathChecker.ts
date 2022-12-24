import fs from "fs";

interface PathToCheck {
  path: string;
  mustExist: boolean;
}

export default function checkPaths(
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
