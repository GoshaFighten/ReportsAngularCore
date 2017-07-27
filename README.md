Clone this repository to your folder

```
git clone https://github.com/GoshaFighten/ReportsAngularCore
```

Restore Node.JS modules, Bower components and NuGet packages. Or, if you open the project in Visual Studio 2017, they should be restored automatically.

Once the dependencies are restored, create the client-side vendor bundle:

```
"node_modules/.bin/webpack" --config webpack.config.vendor.js
```
