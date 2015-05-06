describe('UserModel Tests', function() {

    beforeEach(module('angular-flash.service'));
    beforeEach(module('myApp.auth'));

    var UserModel;

    beforeEach(inject(function($injector) {
        UserModel = $injector.get('UserModel');

        // Setup model with default size of 1
        expect(UserModel.size()).toBe(0);
        UserModel.users.push({id:123, user:'jimmy'});
        expect(UserModel.size()).toBe(1);
    }));

    it('Should be able to add user to model', function() {
        UserModel.users.push({id:987, user:'jammy'});
        expect(UserModel.size()).toBe(2);
    });

    it('Should be able to determine size and clean model', function() {
        expect(UserModel.size()).toBe(1);
        UserModel.clean();
        expect(UserModel.size()).toBe(0);
    });

    it('Should check user has role', function() {
        UserModel.authenticatedUser = {roles:['admin']};
        expect(UserModel.userHasRole("admin")).toBe(true);
        expect(UserModel.userHasRole("internal")).toBe(false);
    });

    it('Should assert isAdmin', function() {
        UserModel.authenticatedUser = {roles:['admin']};
        expect(UserModel.isAdmin()).toBe(true);
        expect(UserModel.isExternal()).toBe(false);
    });

    it('Should assert isExternal', function() {
        UserModel.authenticatedUser = {roles:['external']};
        expect(UserModel.isExternal()).toBe(true);
        expect(UserModel.isAdmin()).toBe(false);
    });

    it('Should assert hasId', function() {
        UserModel.authenticatedUser = {roles:['external'], _id:'123'};
        expect(UserModel.hasId('123')).toBe(true);
    });
});