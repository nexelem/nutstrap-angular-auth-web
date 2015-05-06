###
    Predefined User Roles
###
authModule.constant('UserLevelRoles', [
    { "key": "admin", "value": "role_admin" }
])

###
    Predefined Permissions
###
authModule.constant('UserLevelPermissions', {
    "nav_user": ["admin"]
})