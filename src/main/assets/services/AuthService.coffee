
class AuthService

    constructor: (@$log, @$q, @flash, @$location, @HttpService, @UserModel, @UserConfig) ->
        @$log = $log.getInstance 'Nutstrap'
        @$log.debug "constructing"

    login: (userlogin) ->
        @$log.debug "login"
        deferred = @$q.defer()
        @HttpService.post(@UserConfig.API_LOGIN, userlogin)
            .then(
                (data) =>
                    @flash.i18nSuccess("login_success")
                    @UserModel.authenticatedUser = data
                    deferred.resolve(data)
                ,
                (error) =>
                    @flash.i18nError("login_failure")
                    @UserModel.authenticatedUser = undefined
                    deferred.reject(error)
                )
        deferred.promise


    logout: () ->
        @$log.debug "logout"
        deferred = @$q.defer()
        @HttpService.get(@UserConfig.API_LOGOUT)
            .then(
                (data) =>
                    @flash.i18nSuccess("logout_success")
                    @UserModel.authenticatedUser = undefined
                    deferred.resolve(data)
                ,
                (error) =>
                    @flash.i18nError("logout_failure")
                    @UserModel.authenticatedUser = undefined
                    deferred.reject(error)
                )
        deferred.promise

authModule.service('AuthService', AuthService)