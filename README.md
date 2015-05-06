### angular-users-web

This module contains AngularJS functionality to manage *Users* including controllers, directives and integration services with the `users-play` module.

#### Using the module

Download library manually or add using bower:

```
bower install https://github.com/nexelem/angular-auth-web
```

Include the library in your main angular file  (app.coffee / app.js).

```
dependencies = [
    'myApp.auth'
]
```

if you do not wish to use these route you can omit the `user-modules.js` and define the routes in your app.

```
<script src='@routes.WebJarAssets.at(WebJarAssets.locate("user-module.js"))' type="text/javascript"></script>
```

but you must define the module yourself in the app config.

```
@testModule = angular.module('myApp.auth', [])
```
