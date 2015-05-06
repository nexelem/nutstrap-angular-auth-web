(function() {
  var PermissionModel;

  PermissionModel = (function() {
    function PermissionModel() {
      this.roles = [];
      this.permissions = [];
    }

    PermissionModel.prototype.appendRoles = function(newRoles) {
      var i, len, role;
      for (i = 0, len = newRoles.length; i < len; i++) {
        role = newRoles[i];
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
