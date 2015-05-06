

## HTTP Interceptor for all HTTP calls within the application.
authModule.config(($provide) ->
    ###
      Four available methods of interception:
      1) request: function(config)
      2) requestError: function (rejection)
      3) response: function (response)
      4) responseError: function (rejection)
    ###
    $provide.factory('FlashResponseHttpInterceptor', ($q, $log, $location, $injector, UserModel) ->
        {
            # On response failure
            responseError: (rejection) ->
                @$log = $log.getInstance 'AuthService'

                # if forbidden (and not logging in) redirect to home as may have visiting unpermitted link
                if rejection.status in [403] and rejection.config.url isnt "/login"
                    @$log.info "403 and not /login. Redirect to /"
                    $location.path("/")

                # if forbidden (and logging in) the stay on page with relevant message
                if rejection.status in [403] and rejection.config.url is "/login"
                    $injector.get('flash').i18nError("login_failure")
                    @$log.info "403 and /login. Redirect to /login"
                    UserModel.authenticatedUser = undefined
                    $location.path("/login")

                # Handle error response but ignore browser refresh i.e. /authenticated
                if rejection.status in [401] and rejection.config.url isnt "/authenticated"
                    @$log.info "401 and not /authenticated. Redirect to / with message"
                    $injector.get('flash').i18nError("user_action_unauthorised_session_lost")

                    # Reset models and drive user to login
                    UserModel.authenticatedUser = undefined
                    $location.path("/login")

                # Reject the promise to complete the workflow
                $q.reject(rejection)
        }
    )
)

