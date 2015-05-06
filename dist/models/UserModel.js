(function() {
  var UserModel,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  UserModel = (function() {
    function UserModel($log1, PermissionModel1) {
      this.$log = $log1;
      this.PermissionModel = PermissionModel1;
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
      var currentRole, i, len;
      for (i = 0, len = roles.length; i < len; i++) {
        currentRole = roles[i];
        if (this.userHasRole(currentRole)) {
          return true;
        }
      }
      return false;
    };

    UserModel.prototype.userHasRole = function(role) {
      var i, len, ref, userRole;
      if (this.authenticatedUser == null) {
        return false;
      }
      ref = this.authenticatedUser.roles;
      for (i = 0, len = ref.length; i < len; i++) {
        userRole = ref[i];
        if (userRole === role) {
          return true;
        }
      }
      return false;
    };

    UserModel.prototype.userHasPermission = function(permission) {
      var i, j, len, len1, ref, role, roles, userRole;
      if (this.authenticatedUser == null) {
        return false;
      }
      if (this.authenticatedUser.hasOwnProperty("permissions")) {
        this.$log.debug("Application manages permissions explictly (on the server side)");
        return indexOf.call(this.authenticatedUser.permissions, permission) >= 0;
      } else {
        this.$log.debug("Application does not manage permissions explicitly - they will be derrived from roles");
        roles = this.PermissionModel.permissions[permission];
        if (roles === null || roles === void 0) {
          this.$log.error("Permission " + permission + " is not defined");
          return false;
        }
        for (i = 0, len = roles.length; i < len; i++) {
          role = roles[i];
          ref = this.authenticatedUser.roles;
          for (j = 0, len1 = ref.length; j < len1; j++) {
            userRole = ref[j];
            if (userRole === role) {
              return true;
            }
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
