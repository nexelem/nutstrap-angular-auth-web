(function() {
  var AuthCtrl;

  AuthCtrl = (function() {
    function AuthCtrl($log1, $location, UserModel) {
      this.$log = $log1;
      this.$location = $location;
      this.UserModel = UserModel;
      this.$log = $log.getInstance('AuthCtrl');
      this.$log.debug("constructing");
      if (this.UserModel.authenticatedUser && this.$location.path().indexOf("login") !== -1) {
        this.$location.path("/");
      }
    }

    return AuthCtrl;

  })();

  authModule.controller('AuthCtrl', AuthCtrl);

}).call(this);
