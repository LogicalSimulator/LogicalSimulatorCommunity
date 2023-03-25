If you guys didn't know, we have our own beta site which we push and test features to regularly! It's at [https://beta.logical-simulator.com/](https://beta.logical-simulator.com/).

We've been working on lots of features related to truth tables and integrated circuits. So in beta, we've pushed two new major features: Importing and exporting truth tables from integrated circuits!

![A picture of the "Export IC truth table" dialog in beta, that has selected a half adder and is showing the truth table of a half adder.](https://raw.githubusercontent.com/LogicalSimulator/LogicalSimulatorCommunity/staging/blog/posts/2/assets/exportICTruthTableDialog.png)

You can select any IC definition in your circuit and generate a truth table for it, provided it does not rely on previous state. Good targets include half and full adders, while flip-flops like the D flip flop will not work.

We tried to generate a truth table for a 8-bit adder and subtractor, but then the app crashed as it tried to pass it in as a prop to another component, (yes, we use React 🥶) which easily exceeded the 4GB memory limit and crashed. I mean, _who really wants a truth table that is over 100,000 rows long?_

![A picture of the "Import IC truth table" dialog in beta, that has selected a half adder and is showing an empty truth table editing interface.](https://raw.githubusercontent.com/LogicalSimulator/LogicalSimulatorCommunity/staging/blog/posts/2/assets/importICTruthTableDialog.png)

You can also convert a truth table to components as well, sort of the opposite of exporting a IC definition to truth table. You input your truth table (make sure the pin configuration is the same!) and it will use boolean algebra to convert it to components! I have no idea how the math works, I just copied and pasted it from [@Bobingstern](https://github.com/Bobingstern) who wrote it.

Please note that both tools are currently in beta, evident by the badge in their name, due to the limited testing we have performed so far. Also note that as a whole, the beta site will change often, and it should not be used for projects you wish to keep! If you do use it, feel free to report bugs to us, either on the [community repository](https://github.com/LogicalSimulator/LogicalSimulatorCommunity/issues) or by emailing [logicalsimulator@gmail.com](mailto:logicalsimulator@gmail.com).

You can find both of these tools on the beta site at [https://beta.logical-simulator.com/](https://beta.logical-simulator.com/).
