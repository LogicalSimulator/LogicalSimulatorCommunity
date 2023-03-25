# LogicalSimulatorCommunity

[![Contribute with Gitpod](https://img.shields.io/badge/Contribute%20with-Gitpod-908a85?logo=gitpod)](https://gitpod.io/#https://github.com/LogicalSimulator/LogicalSimulatorCommunity) ![License: LGPL-2.1](https://img.shields.io/github/license/LogicalSimulator/LogicalSimulatorCommunity?label=License) ![This repository's starred count](https://img.shields.io/github/stars/LogicalSimulator/LogicalSimulatorCommunity?label=GitHub%20stars)

The community repository for [Logical Simulator](https://www.logical-simulator.com/) - the modern and intuitive digital logic gate simulator.

## Adding examples or community circuits

If you want to add an example or community circuit, you can [file an issue](https://github.com/LogicalSimulator/LogicalSimulatorCommunity/issues/new/choose) for that. If you want to do it yourself, we have a small CLI helper that will create and update the neccessary files, allowing you to type or paste in the new content!

If `yarn` doesn't work, you may have to prefix the commands with `npx`.

### Install

1. `yarn` to install dependencies.
2. `yarn run compile` to compile the TypeScript down to JavaScript.

### Usage

Run `yarn run logicalSimulatorCommunityCLI`.

An example command to add a circuit:

```
$ yarn run logicalSimulatorCommunityCLI add eightBitMemoryCell -t example -n "Eight-bit memory cell" -a "UnsignedArduino" --githubProfileURL "https://github.com/UnsignedArduino" --originalPostURL "https://github.com/LogicalSimulator/LogicalSimulatorCommunity/issues/5"
```

It is recommended to specify the author's GitHub profile URL and the link to the original post, as it shows up in the examples or community circuits page.

After running the command, there will be additional instructions specifying which files to add which content.
