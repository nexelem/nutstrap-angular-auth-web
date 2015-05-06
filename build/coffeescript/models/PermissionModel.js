// Generated by CoffeeScript 1.8.0
(function() {
  var PermissionModel;

  PermissionModel = (function() {
    function PermissionModel() {
      this.roles = [];
      this.permissions = [];
    }

    PermissionModel.prototype.appendRoles = function(newRoles) {
      var role, _i, _len;
      for (_i = 0, _len = newRoles.length; _i < _len; _i++) {
        role = newRoles[_i];
        this.roles.push(role);
      }
      return this.roles;
    };

    PermissionModel.prototype.appendPermissions = function(newPermissions) {
      var permission, roles;
      for (permission in newPermissions) {
        roles = newPermissions[permission];
        this.permissions[permission] = roles;
      }
      return this.permissions;
    };

    return PermissionModel;

  })();

  authModule.factory('PermissionModel', function() {
    return new PermissionModel();
  });

}).call(this);
