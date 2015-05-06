
class UserModel

    constructor: (@$log, @PermissionModel) ->
        @users = []
        @authenticatedUser
        @bootstrapped = false

    isAdmin: () ->
        @userHasRole("admin")

    isExternal: () ->
        @userHasRole("external")

    hasId: (id) ->
        if not @authenticatedUser?
            return false

        id is @authenticatedUser._id

    size: () ->
        @users.length

    clean: () ->
        @users = []

    userHasOneOfRoles: (roles) ->
        for currentRole in roles
            if @userHasRole(currentRole)
                return true

        false

    userHasRole: (role) ->
        if not @authenticatedUser?
            return false

        for userRole in @authenticatedUser.roles
            if userRole is role
                return true

        false

    userHasPermission: (permission) ->
        if not @authenticatedUser?
            return false

        if @authenticatedUser.hasOwnProperty("permissions")
            @$log.debug "Application manages permissions explictly (on the server side)"
            return permission in @authenticatedUser.permissions
        else
            @$log.debug "Application does not manage permissions explicitly - they will be derrived from roles"
            roles = @PermissionModel.permissions[permission]
            if roles is null or roles is undefined
                @$log.error("Permission #{permission} is not defined" )
                return false

            for role in roles
                for userRole in @authenticatedUser.roles
                    if userRole is role
                        return true

        false

authModule.factory 'UserModel', ($log, PermissionModel) -> new UserModel($log, PermissionModel)