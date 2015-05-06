
describe('Has Permission Directive', function(){

    beforeEach(module('myApp.common'));
    beforeEach(module('angular-flash.service'));
    beforeEach(module('ngI18n'));
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

    var $scope, $form, compiledForm, UserModel, PermissionModel;

    beforeEach(inject(function($compile, $rootScope, $injector) {
        UserModel = $injector.get('UserModel');

        PermissionModel = $injector.get('PermissionModel');
        PermissionModel.appendRoles([{ "key": "admin", "value": "role_admin" }, { "key": "regular", "value": "role_regular" }]);
        PermissionModel.appendPermissions({
            "nav_user": ["admin"],
            "task_reject": ["admin", "regular"]
        });

        UserModel.authenticatedUser = { roles: ["internal"] };

        $scope = $rootScope;
        var element = angular.element(
            '<span has-permission="nav_user">My Content</span>'
        );
        compiledForm = $compile(element)($scope);
        $scope.$digest();
        $form = $scope.form;
    }));

    it('Element should be hidden by default when no permission', function() {
        expect(compiledForm[0].className).toContain('ng-hide');
        expect(compiledForm[0].className).not.toContain('ng-show');
    });

    it('Element should be shown if user has correct role', function() {

        UserModel.authenticatedUser = { roles: ["admin"] };

        compiledForm.scope().$apply();
        expect(compiledForm[0].className).toContain('ng-show');
        expect(compiledForm[0].className).not.toContain('ng-hide');
    });
});

describe('Has Permission arrays', function(){

    beforeEach(module('myApp.common'));
    beforeEach(module('myApp.auth'));

    var $scope, $form, compiledForm,cmpForm2,cmpForm3, UserModel, PermissionModel, $log;

    beforeEach(inject(function($compile, $rootScope, $injector) {
        UserModel = $injector.get('UserModel');
        UserModel.authenticatedUser = { roles: ["external"] };

        PermissionModel = $injector.get('PermissionModel');
        PermissionModel.appendRoles([{ "key": "admin", "value": "role_admin" }, { "key": "regular", "value": "role_regular" }]);
        PermissionModel.appendPermissions({
            "nav_user": ["admin"],
            "task_reject": ["admin", "regular"]
        });

        $log = $injector.get('$log');
        $scope = $rootScope;
        var element = angular.element(
            '<span has-permission="task_reject">My Content</span>'
        );
        var elementWithoutPermission = angular.element(
            '<span has-permission>My Content</span>'
        );
        var elemWithWrongPermission = angular.element(
            '<span has-permission="notExistingRole">My Content</span>'
        );
        compiledForm = $compile(element)($scope);
        cmpForm2 = $compile(elementWithoutPermission)($scope);

        cmpForm3 = $compile(elemWithWrongPermission)($scope);

        $scope.$digest();
        $form = $scope.form;
    }));

    it('Element should be hidden by default when no permission', function() {
        expect(compiledForm[0].className).toContain('ng-hide');
        expect(compiledForm[0].className).not.toContain('ng-show');
    });

    it('Element should be shown if user has correct permission', function() {

        UserModel.authenticatedUser = { roles: ["admin"] };

        compiledForm.scope().$apply();
        expect(compiledForm[0].className).toContain('ng-show');
        expect(compiledForm[0].className).not.toContain('ng-hide');

        UserModel.authenticatedUser = { roles: ["regular"] };

        compiledForm.scope().$apply();
        expect(compiledForm[0].className).toContain('ng-show');
        expect(compiledForm[0].className).not.toContain('ng-hide');
    });

    it('It should fail if not authenticated user', function() {

        UserModel.authenticatedUser = undefined;

        compiledForm.scope().$apply()

        expect(compiledForm[0].className).toContain('ng-hide');
    });

    it('It should fail if not roles defined', function() {

        UserModel.authenticatedUser = { roles: ["admin"] };

        cmpForm2.scope().$apply()

        expect($log.error.logs[0][0]).toEqual("Attribute value invalid ");
    });

    it('It should fail if not roles defined', function() {

        UserModel.authenticatedUser = { roles: ["admin"] };

        cmpForm3.scope().$apply()

        expect($log.error.logs[0][0]).toEqual("Attribute value invalid ");
    });

});