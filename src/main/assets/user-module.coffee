@authModule = angular.module('myApp.auth', ['myApp.common','angular-flash.service','myApp.i18n','ngRoute'])
    .config(($routeProvider) ->
        $routeProvider
            .when('/login', {
                templateUrl: '/libs/angular-auth-web/dist/login.html'
            })
    )