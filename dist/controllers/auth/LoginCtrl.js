(function() {
  var LoginCtrl;

  LoginCtrl = (function() {
    function LoginCtrl($log1, $location, $rootScope, AuthService, UserModel, flash) {
      this.$log = $log1;
      this.$location = $location;
      this.$rootScope = $rootScope;
      this.AuthService = AuthService;
      this.UserModel = UserModel;
      this.flash = flash;
      this.$log = $log.getInstance('LoginCtrl');
      this.$log.debug("constructing");
      this.userlogin = {};
    }

    LoginCtrl.prototype.login = function() {
      this.$log.info("login for user: " + this.userlogin.username);
      return this.AuthService.login(this.userlogin).then((function(_this) {
        return function(data) {
          var search;
          _this.$log.debug("AuthService.login promise OK");
          search = _this.$location.search();
          _this.$location.path(search.action ? search.action : "/").search({});
          return _this.flash.i18nSuccess("login_successful");
        };
      })(this));
    };

    return LoginCtrl;

  })();

  authModule.controller('LoginCtrl', LoginCtrl);

}).call(this);
