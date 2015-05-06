describe('AuthService Tests', function() {

    beforeEach(module('myApp.common'));
    beforeEach(module('ngI18n'));
    beforeEach(module('angular-flash.service'));
    beforeEach(module('myApp.i18n'));
    beforeEach(module('myApp.auth'));

    beforeEach(module(function($provide) {
        $provide.factory('I18nResourceService', function() {
            return {
                lookupValue: function() {
                    return "Test key with {key} substituted";
                }
            };
        });
    }));

    // Run test
    describe('AuthService', function(){

        var $scope, $location, HttpService, AuthService, UserModel, flash;

        // Dynamically return promise depending on test
        var returnPromise;

        beforeEach(inject(function($injector, $rootScope) {
            HttpService = $injector.get('HttpService');
            AuthService = $injector.get('AuthService');
            UserModel = $injector.get('UserModel');

            flash = $injector.get('flash');
            flash.i18nError = jasmine.createSpy("i18nError");
            flash.i18nSuccess = jasmine.createSpy("i18nSuccess");

            $location = $injector.get('$location');

            returnPromise = $injector.get('$q').defer();

            $scope = $rootScope.$new();

            spyOn(HttpService, 'post').andReturn(returnPromise.promise);
            spyOn(HttpService, 'put').andReturn(returnPromise.promise);
            spyOn(HttpService, 'get').andReturn(returnPromise.promise);
            spyOn(HttpService, 'delete').andReturn(returnPromise.promise);
        }));

        afterEach(function(){
            // Force any anything on the scope to resolve
            $scope.$apply();
        });

        it('Should Return authenticated user on successful login', function() {

            returnPromise.resolve({id:987});

            var promise = AuthService.login({username:'Jimmy@bbc.com', password:'dfggwg'});

            $scope.$apply();
            expect(HttpService.post).toHaveBeenCalledWith('/login', {username:'Jimmy@bbc.com', password:'dfggwg'});
            expect(promise).toBeDefined();

            expect(UserModel.authenticatedUser).toBeDefined();
            expect(UserModel.authenticatedUser.id).toEqual(987);
            expect(flash.i18nSuccess).toHaveBeenCalledWith("login_success");
        });

        it('Should Return error on failed login', function() {

            returnPromise.reject('Error!');

            var promise = AuthService.login({username:'Jimmy@bbc.com', password:'dfggwg'});

            expect(HttpService.post).toHaveBeenCalledWith('/login', {username:'Jimmy@bbc.com', password:'dfggwg'});

            $scope.$apply();

            expect(flash.i18nError).toHaveBeenCalledWith("login_failure");
            expect(UserModel.authenticatedUser).toBeUndefined();
        });

        it('Should Return ok on successful logout', function() {

            returnPromise.resolve({});

            var promise = AuthService.logout();

            $scope.$apply();
            expect(HttpService.get).toHaveBeenCalledWith('/logout');
            expect(promise).toBeDefined();

            expect(UserModel.authenticatedUser).toBeUndefined();
            expect(flash.i18nSuccess).toHaveBeenCalledWith("logout_success");
        });

        it('Should remove authenticated user on logout failure', function() {

            returnPromise.reject('Error!');

            var promise = AuthService.logout();

            $scope.$apply();
            expect(HttpService.get).toHaveBeenCalledWith('/logout');
            expect(promise).toBeDefined();

            expect(UserModel.authenticatedUser).toBeUndefined();
        });
    });
});