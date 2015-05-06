(function() {
  var AuthService;

  AuthService = (function() {
    function AuthService($log1, $q, flash, $location, HttpService, UserModel, UserConfig) {
      this.$log = $log1;
      this.$q = $q;
      this.flash = flash;
      this.$location = $location;
      this.HttpService = HttpService;
      this.UserModel = UserModel;
      this.UserConfig = UserConfig;
      this.$log = $log.getInstance('Nutstrap');
      this.$log.debug("constructing");
    }

    AuthService.prototype.login = function(userlogin) {
      var deferred;
      this.$log.debug("login");
      deferred = this.$q.defer();
      this.HttpService.post(this.UserConfig.API_LOGIN, userlogin).then((function(_this) {
        return function(data) {
          _this.flash.i18nSuccess("login_success");
          _this.UserModel.authenticatedUser = data;
          return deferred.resolve(data);
        };
      })(this), (function(_this) {
        return function(error) {
          _this.flash.i18nError("login_failure");
          _this.UserModel.authenticatedUser = void 0;
          return deferred.reject(error);
        };
      })(this));
      return deferred.promise;
    };

    AuthService.prototype.logout = function() {
      var deferred;
      this.$log.debug("logout");
      deferred = this.$q.defer();
      this.HttpService.get(this.UserConfig.API_LOGOUT).then((function(_this) {
        return function(data) {
          _this.flash.i18nSuccess("logout_success");
          _this.UserModel.authenticatedUser = void 0;
          return deferred.resolve(data);
        };
      })(this), (function(_this) {
        return function(error) {
          _this.flash.i18nError("logout_failure");
          _this.UserModel.authenticatedUser = void 0;
          return deferred.reject(error);
        };
      })(this));
      return deferred.promise;
    };

    return AuthService;

  })();

  authModule.service('AuthService', AuthService);

}).call(this);
