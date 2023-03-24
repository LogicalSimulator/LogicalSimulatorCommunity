import fs from "fs";
import path from "path";
import yargs from "yargs";

export default function AddAddBlogCommand(yarg: yargs.Argv): yargs.Argv {
  return yarg.command(
    "addBlog",
    "Helper to add a blog post to the Community repository.",
    {
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
      unixTime: {
        alias: "t",
        desc: "Override the (Unix) time when you made this blog post.",
        type: "number",
      },
    },
    (args) => {
      const cwd = process.cwd();
      const blogDirPath = path.join(cwd, "blog");
      const postsDirPath = path.join(blogDirPath, "posts");
      const allJSONPath = path.join(blogDirPath, "all.json");
      const archiveJSONPath = path.join(blogDirPath, "archive.json");

      for (const path of [{ path: allJSONPath, mustExist: true }]) {
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

      const all = JSON.parse(
        fs.readFileSync(allJSONPath, { encoding: "utf8" })
      );

      all.postCount++;
      const postId = all.postCount;

      fs.writeFileSync(allJSONPath, JSON.stringify(all, null, 2) + "\n", {
        encoding: "utf8",
      });

      const newPostDirPath = path.join(postsDirPath, `${postId}`);
      const newPostMdPath = path.join(newPostDirPath, "post.md");
      const newPostPreviewMdPath = path.join(newPostDirPath, "preview.md");
      const infoPath = path.join(newPostDirPath, "info.json");

      fs.mkdirSync(newPostDirPath);

      for (const path of [newPostMdPath, newPostPreviewMdPath]) {
        fs.writeFileSync(path, "");
      }

      const date =
        args.unixTime != undefined
          ? args.unixTime
          : Math.floor(Date.now() / 1000);

      const info = {
        author: {
          name: args.author,
          githubProfileURL: args.githubProfileURL,
        },
        post: {
          title: args.name,
          date,
        },
      };
      fs.writeFileSync(infoPath, JSON.stringify(info, null, 2) + "\n", {
        encoding: "utf8",
      });

      const archiveInfo = {
        post: {
          title: args.name,
          date,
        },
      };

      const archive = JSON.parse(
        fs.readFileSync(archiveJSONPath, { encoding: "utf8" })
      );

      archive.archiveListing.push(archiveInfo);

      fs.writeFileSync(
        archiveJSONPath,
        JSON.stringify(archive, null, 2) + "\n",
        {
          encoding: "utf8",
        }
      );

      console.info(`Copy the post markdown to ${newPostDirPath}`);
      console.info(`Copy the post preview markdown to ${newPostPreviewMdPath}`);
    }
  );
}
