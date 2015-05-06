
describe('FlashResponseHttpInterceptor', function() {

    var interceptor, flash, $location, UserModel;

    var UNAUTH = [401];
    var FORBIDDEN = [403];

    beforeEach(module('myApp.common'));
    beforeEach(module('angular-flash.service'));
    beforeEach(module('ngI18n'));
    beforeEach(module('myApp.auth'));

    beforeEach(inject(function($injector, $rootScope) {
        interceptor = $injector.get('FlashResponseHttpInterceptor');
        flash = $injector.get('flash');
        flash.i18nError = jasmine.createSpy("i18nError");
        $location = $injector.get('$location');
        UserModel = $injector.get('UserModel');
    }));

    it('Should not intercept non-401 error responses', function() {
        var httpResponse = {
            status: 200,
            config: {
                url: "/some-api-endpoint",
                method: "POST"
            }
        };
        interceptor.responseError(httpResponse);
        expect(flash.error).toBeUndefined();
    });

    it('Should intercept 401 error responses and report via flash message', function() {
        UNAUTH.forEach(function(status){

            // Reset Objects
            UserModel.authenticatedUser = {user:"user"};
            $location.path("/somethingOtherThanLogin");

            var notAuthResponse = {
                status: status,
                config: {
                    url: "/some-api-endpoint",
                    method: "POST"
                }
            };
            interceptor.responseError(notAuthResponse);
            expect(flash.i18nError).toHaveBeenCalledWith('user_action_unauthorised_session_lost');

            // Ensure objects cleared
            expect(UserModel.authenticatedUser).toBeUndefined();
            expect($location.path()).toEqual("/login");
        });
    });

    it('Should intercept 403 error responses and redirect to homepage', function() {
        FORBIDDEN.forEach(function(status){

            // Reset Objects
            UserModel.authenticatedUser = {user:"user"};
            $location.path("/somethingOtherThanLogin");

            var notAuthResponse = {
                status: status,
                config: {
                    url: "/some-api-endpoint",
                    method: "POST"
                }
            };
            interceptor.responseError(notAuthResponse);
            expect($location.path()).toEqual("/");
        });
    });

    it('Should intercept 403 error responses for login and report via flash message', function() {
        FORBIDDEN.forEach(function(status){

            // Reset Objects
            UserModel.authenticatedUser = {};
            $location.path("/login");

            var notAuthResponse = {
                status: status,
                config: {
                    url: "/login",
                    method: "POST"
                }
            };
            interceptor.responseError(notAuthResponse);
            expect(flash.i18nError).toHaveBeenCalledWith('login_failure');

            // Ensure objects cleared
            expect(UserModel.authenticatedUser).toBeUndefined();
            expect($location.path()).toEqual("/login");
        });
    });

    it('Should intercept 401 error responses but ignores if API call is [/authenticated]', function() {
        UNAUTH.forEach(function(status){
            var notAuthResponse = {
                status: status,
                config: {
                    url: "/authenticated",
                    method: "POST"
                }
            };
            interceptor.responseError(notAuthResponse);
            expect(flash.i18nError).not.toHaveBeenCalledWith();
        });
    });

});