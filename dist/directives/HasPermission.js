
/*
    This directive watches the authenticated user and raises security errors
 */

(function() {
  authModule.directive('hasPermission', function($log, UserModel, PermissionModel) {
    return {
      restrict: 'A',
      link: function(scope, elm, attrs, ctrl) {
        return scope.$watch(function() {
          return UserModel.authenticatedUser;
        }, function(newValue, oldValue) {
          var accessSuccessful, allowedRoles, ref;
          elm.removeClass("ng-show");
          elm.addClass("ng-hide");
          if (!UserModel.authenticatedUser) {
            return;
          }
          allowedRoles = PermissionModel.roles.map(function(kv) {
            return kv.key;
          });
          if (!(allowedRoles != null ? allowedRoles.length : void 0)) {
            return $log.error("AllowedRoles not found!");
          }
          if (!((ref = attrs.hasPermission) != null ? ref.length : void 0)) {
            return $log.error("Attribute value invalid " + attrs.hasPermission);
          }
          accessSuccessful = UserModel.userHasPermission(attrs.hasPermission);
          if (!accessSuccessful) {
            return;
          }
          elm.removeClass("ng-hide");
          return elm.addClass("ng-show");
        });
      }
    };
  });

}).call(this);
