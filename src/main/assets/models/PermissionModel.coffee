#
# Contains appendable* model of roles and permissions used throughout the system
# * appendable, hence it can be extended in modules that are using it
#
class PermissionModel

    constructor: () ->
        @roles = []
        @permissions = []

    appendRoles: (newRoles) ->
        for role in newRoles
            @roles.push role

        @roles

    appendPermissions: (newPermissions) ->
        for permission, roles of newPermissions
            @permissions[permission] = roles

        @permissions

authModule.factory 'PermissionModel', -> new PermissionModel()