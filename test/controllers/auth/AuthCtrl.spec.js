describe('AuthCtrl Tests', function () {

    beforeEach(module('myApp.common'));
    beforeEach(module('angular-flash.service'));
    beforeEach(module('myApp.i18n'));
    beforeEach(module('myApp.auth'));

    beforeEach(module(function($provide) {
        $provide.factory('I18nResourceService', function() {
            return {
                getMapForKey: function() {
                    return "Test key with {key} substituted";
                }
            };
        });
    }));

    describe('Functionalty checks', function () {

        var $scope, $location, AuthCtrl, LoginCtrl, AuthService, UserModel;
        var deferredPromise;

        beforeEach(inject(function ($rootScope, $controller, $injector) {
            $location = $injector.get('$location');

            // Force set a path
            $location.path("/login");
            // Force set a user to ensure the path is moved away from login
            UserModel = $injector.get('UserModel');
            UserModel.authenticatedUser = {name:'test'};

            deferredPromise = $injector.get('$q').defer();

            AuthService = $injector.get('AuthService');
            spyOn(AuthService, 'login').andReturn(deferredPromise.promise);
            spyOn(AuthService, 'logout').andReturn(deferredPromise.promise);

            $scope = $rootScope.$new();
            AuthCtrl = $controller('AuthCtrl', {$scope: $scope});
            LoginCtrl = $controller('LoginCtrl', {$scope: $scope});
        }));

        it('Should construct AuthCtrl as expected', function () {
            expect(AuthCtrl).toBeDefined();
            expect($location.path()).toBe("/");
        });

        it('Should construct AuthCtrl on incorrect path ', function () {
            $location.path("/user");
            expect(AuthCtrl).toBeDefined();
            expect($location.path()).toBe("/user");
        });

        it('Should login successfully and move to home page', function () {
            deferredPromise.resolve({user:"jimbob"});

            LoginCtrl.login();
            $scope.$apply();

            expect(AuthService.login).toHaveBeenCalled();
            expect($location.path()).toEqual("/");
        });
    });


    describe('Functionalty checks', function () {

        var $scope, $location, AuthCtrl, AuthService, UserModel;
        var deferredPromise;

        beforeEach(inject(function ($rootScope, $controller, $injector) {
            $location = $injector.get('$location');

            // Force set a path
            $location.path("/");
            // Force set a user to ensure the path is moved away from login
            UserModel = $injector.get('UserModel');
            UserModel.authenticatedUser = {name:'test'};

            deferredPromise = $injector.get('$q').defer();

            AuthService = $injector.get('AuthService');


            $scope = $rootScope.$new();
            AuthCtrl = $controller('AuthCtrl', {$scope: $scope});
        }));

        it('Should construct AuthCtrl on incorrect path ', function () {
            $location.path("/user");
            expect(AuthCtrl).toBeDefined();
            expect($location.path()).toBe("/user");
        });

    });

});
