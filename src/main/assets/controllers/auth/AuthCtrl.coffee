class AuthCtrl

    constructor: (@$log,  @$location, @UserModel) ->
        @$log = $log.getInstance 'AuthCtrl'
        @$log.debug "constructing"
        if @UserModel.authenticatedUser and @$location.path().indexOf("login") isnt -1
            @$location.path("/")

authModule.controller('AuthCtrl', AuthCtrl)
