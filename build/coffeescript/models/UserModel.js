// Generated by CoffeeScript 1.8.0
(function() {
  var UserModel;

  UserModel = (function() {
    function UserModel($log, PermissionModel) {
      this.$log = $log;
      this.PermissionModel = PermissionModel;
      this.users = [];
      this.authenticatedUser;
      this.bootstrapped = false;
    }

    UserModel.prototype.isAdmin = function() {
      return this.userHasRole("admin");
    };

    UserModel.prototype.isExternal = function() {
      return this.userHasRole("external");
    };

    UserModel.prototype.hasId = function(id) {
      if (this.authenticatedUser == null) {
        return false;
      }
      return id === this.authenticatedUser._id;
    };

    UserModel.prototype.size = function() {
      return this.users.length;
    };

    UserModel.prototype.clean = function() {
      return this.users = [];
    };

    UserModel.prototype.userHasOneOfRoles = function(roles) {
      var currentRole, _i, _len;
      for (_i = 0, _len = roles.length; _i < _len; _i++) {
        currentRole = roles[_i];
        if (this.userHasRole(currentRole)) {
          return true;
        }
      }
      return false;
    };

    UserModel.prototype.userHasRole = function(role) {
      var userRole, _i, _len, _ref;
      if (this.authenticatedUser == null) {
        return false;
      }
      _ref = this.authenticatedUser.roles;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        userRole = _ref[_i];
        if (userRole === role) {
          return true;
        }
      }
      return false;
    };

    UserModel.prototype.userHasPermission = function(permission) {
      var role, roles, userRole, _i, _j, _len, _len1, _ref;
      if (this.authenticatedUser == null) {
        return false;
      }
      roles = this.PermissionModel.permissions[permission];
      for (_i = 0, _len = roles.length; _i < _len; _i++) {
        role = roles[_i];
        _ref = this.authenticatedUser.roles;
        for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
          userRole = _ref[_j];
          if (userRole === role) {
            return true;
          }
        }
      }
      return false;
    };

    return UserModel;

  })();

  authModule.factory('UserModel', function($log, PermissionModel) {
    return new UserModel($log, PermissionModel);
  });

}).call(this);
