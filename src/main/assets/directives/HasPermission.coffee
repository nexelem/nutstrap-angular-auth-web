
###
    This directive watches the authenticated user and raises security errors
###
authModule.directive('hasPermission', ($log, UserModel, PermissionModel) ->
    {
        restrict: 'A', ## Only use on attributes
        link: (scope, elm, attrs, ctrl) ->


            scope.$watch(
                () ->
                    UserModel.authenticatedUser
                ,
                (newValue, oldValue) ->

                    # always hide then show if has correct role
                    elm.removeClass("ng-show");
                    elm.addClass("ng-hide");

                    # unauthenticated - do nothing; keep hidden!
                    return if not UserModel.authenticatedUser

                    allowedRoles = PermissionModel.roles.map (kv) -> kv.key

                    # resources must be loaded
                    return $log.error("AllowedRoles not found!") if not allowedRoles?.length

                    # must pass a valid string
                    return $log.error("Attribute value invalid #{attrs.hasPermission}") if not attrs.hasPermission?.length

                    accessSuccessful = UserModel.userHasPermission(attrs.hasPermission)
                    return if not accessSuccessful

                    elm.removeClass("ng-hide")
                    elm.addClass("ng-show")
            )
    }
)