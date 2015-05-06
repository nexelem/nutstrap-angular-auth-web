(function() {
  this.authModule = angular.module('myApp.auth', ['myApp.common', 'angular-flash.service', 'myApp.i18n', 'ngRoute']).config(function($routeProvider) {
    return $routeProvider.when('/login', {
      templateUrl: '/assets/lib/angular-auth-web/login/login.html'
    });
  });

}).call(this);
