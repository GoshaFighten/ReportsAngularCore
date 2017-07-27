This example illustrates how to use DevExpress XtraReports in an Angular application with the ASP.NET Core .NET Framework backend.

<b>Installation</b>

Clone this repository to your folder:
 
```
git clone https://github.com/GoshaFighten/ReportsAngularCore
```
 
Restore Node.JS modules, Bower components and NuGet packages. Or, if you open the project in Visual Studio 2017, they should be restored automatically.
 
Once the dependencies are restored, create the client-side vendor bundle:
 
```
"node_modules/.bin/webpack" --config webpack.config.vendor.js
```

<b>Step by step</b>

1. Create an Angular project from [https://github.com/aspnet/JavaScriptServices](https://github.com/aspnet/JavaScriptServices).

2. Since XtraReports needs the full .NET Framework, convert the created project to use the full .NET Framework. To do this, replace
 
```
<TargetFramework>netcoreapp1.1</TargetFramework>
```
with
```
<TargetFramework>net452</TargetFramework>
<RuntimeIdentifier>win7-x86</RuntimeIdentifier>
```
in the ReportsAngularCore.csproj file. See the [a4077bc](https://github.com/GoshaFighten/ReportsAngularCore/commit/a4077bce13638642aaf7d002febeb7b1a7bdd12f) commit for details.

3. Add DevExtreme to the project by following the [Add DevExtreme to NET Core Angular 2 Template](https://js.devexpress.com/Documentation/Guide/VS_Integration/Add_DevExtreme_to_NET_Core_Angular_2_Template/) article. And, add a new page where our report will be hosted. See the [8ac32a9](https://github.com/GoshaFighten/ReportsAngularCore/commit/8ac32a97c68f3f6c0608392d15e239c1824cefec) commit for details.

4. Add the `xtrareportsjs` library via `Bower`.

5. It's necessary to remove the `var DevExpress;` lines from the `xtrareportsjs` scripts since they will override the `DevExpress` namespace when used in `Webpack`. For this, we will use a `Gulp` task which we make run before building our project.
 
``` JavaScript
var gulp = require('gulp');
var deleteLines = require('gulp-delete-lines');
 
gulp.task('default', function () {
    gulp.src(['./bower_components/xtrareportsjs/js/dx-designer.js', './bower_components/xtrareportsjs/js/web-document-viewer.js'])
        .pipe(deleteLines({
            'filters': [
                /var DevExpress;/i
            ]
        }))
        .pipe(gulp.dest('./bower_components/xtrareportsjs/js'));
});
```
See the [5461fba](https://github.com/GoshaFighten/ReportsAngularCore/commit/5461fbae93e598ba9aaf4429a0598489e6942672) commit for details.

6. Add the required report styles to the ` webpack.config.vendor.js` file. See the [ac7eaf4](https://github.com/GoshaFighten/ReportsAngularCore/commit/ac7eaf47410f6cf272289350b9de1fb8736c499b) commit for details.

7. Let's render our report viewer and the scripts that are needed, and its dependencies in our `reportviewer` component. Check out the [How to integrate DevExpress reporting components into an ASP.NET Core (a.k.a vNext / ASP.NET 5 / MVC6) web application ](https://www.devexpress.com/Support/Center/Question/Details/T360117) article for how to render the report viewer and what scripts are needed. See the [34bd3d5](https://github.com/GoshaFighten/ReportsAngularCore/commit/34bd3d56c1eb4445571fd6b26be879309bded4c0) commit for details.

8. Now we need to configure `Webpack`. `xtrareportsjs` needs jQuery and Knockout in the global scope. Let's provide these libraries using the [ProvidePlugin](https://webpack.js.org/plugins/provide-plugin/). Plus, `xtrareportsjs` expects certain DevExtreme modules in the global scope. We will provide them using the `Webpack` [expose-loader](https://www.npmjs.com/package/expose-loader). Then, we need to resolve modules we are using in our `reportviewer` component. To do this, we will use the `Webpack` [resolve.alias](https://webpack.js.org/configuration/resolve/#resolve-alias) section.
 
See the [6741df9](https://github.com/GoshaFighten/ReportsAngularCore/commit/6741df965ebb161059cff87c3d6f979fb131ff23) commit for details.

9. Now our client-side part is ready. Let's create our ASP.NET Core backend as described in the [How to integrate DevExpress reporting components into an ASP.NET Core (a.k.a vNext / ASP.NET 5 / MVC6) web application ](https://www.devexpress.com/Support/Center/Question/Details/T360117). See the [adf6400](https://github.com/GoshaFighten/ReportsAngularCore/commit/adf64004b3145aa0cf9f93b7876f2be24a0bd90d) commit for details.
