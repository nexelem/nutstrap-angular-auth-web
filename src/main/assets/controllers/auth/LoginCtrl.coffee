class LoginCtrl

    constructor: ($log, @$location, @$rootScope, @AuthService, @UserModel, @flash) ->
        @$log = $log.getInstance 'LoginCtrl'
        @$log.debug("constructing")
        @userlogin = {}

    login: () ->
        @$log.info("login for user: #{@userlogin.username}")
        @AuthService.login(@userlogin)
            .then(
                (data) =>
                    @$log.debug "AuthService.login promise OK"
                    search = @$location.search()
                    @$location.path(if search.action then search.action else "/").search({})
                    @flash.i18nSuccess("login_successful")
            )

authModule.controller('LoginCtrl', LoginCtrl)
