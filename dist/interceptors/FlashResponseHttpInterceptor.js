(function() {
  authModule.config(function($provide) {

    /*
      Four available methods of interception:
      1) request: function(config)
      2) requestError: function (rejection)
      3) response: function (response)
      4) responseError: function (rejection)
     */
    return $provide.factory('FlashResponseHttpInterceptor', function($q, $log, $location, $injector, UserModel) {
      return {
        responseError: function(rejection) {
          var ref, ref1, ref2;
          this.$log = $log.getInstance('AuthService');
          if (((ref = rejection.status) === 403) && rejection.config.url !== "/login") {
            this.$log.info("403 and not /login. Redirect to /");
            $location.path("/");
          }
          if (((ref1 = rejection.status) === 403) && rejection.config.url === "/login") {
            $injector.get('flash').i18nError("login_failure");
            this.$log.info("403 and /login. Redirect to /login");
            UserModel.authenticatedUser = void 0;
            $location.path("/login");
          }
          if (((ref2 = rejection.status) === 401) && rejection.config.url !== "/authenticated") {
            this.$log.info("401 and not /authenticated. Redirect to / with message");
            $injector.get('flash').i18nError("user_action_unauthorised_session_lost");
            UserModel.authenticatedUser = void 0;
            $location.path("/login");
          }
          return $q.reject(rejection);
        }
      };
    });
  });

}).call(this);
