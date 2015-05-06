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


add the java script to your main html file (index.html)

```
<script src='@routes.Assets.at("lib/angular-auth-web/user-module.js")' type="text/javascript"></script>
<script src='@routes.Assets.at("lib/angular-auth-web/models/UserModel.js")' type="text/javascript"></script>
<script src='@routes.Assets.at("lib/angular-auth-web/services/AuthService.js")' type="text/javascript"></script>
<script src='@routes.Assets.at("lib/angular-auth-web/controllers/AuthCtrl.js")' type="text/javascript"></script>
<script src='@routes.Assets.at("lib/angular-auth-web/interceptors/FlashResponseHttpInterceptor.js")' type="text/javascript"></script>
<script src='@routes.Assets.at("lib/angular-auth-web/directives/HasPermission.js")' type="text/javascript"></script>
```

if you do not wish to use these route you can omit the `user-modules.js` and define the routes in your app.

```
<script src='@routes.WebJarAssets.at(WebJarAssets.locate("user-module.js"))' type="text/javascript"></script>
```

but you must define the module yourself in the app config.

```
@testModule = angular.module('myApp.auth', [])
```
