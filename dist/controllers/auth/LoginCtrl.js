(function(){var LoginCtrl;LoginCtrl=function(){function LoginCtrl($log1,$location,$rootScope,AuthService,UserModel,flash){this.$log=$log1,this.$location=$location,this.$rootScope=$rootScope,this.AuthService=AuthService,this.UserModel=UserModel,this.flash=flash,this.$log=$log.getInstance("LoginCtrl"),this.$log.debug("constructing"),this.userlogin={}}return LoginCtrl.prototype.login=function(){return this.$log.info("login for user: "+this.userlogin.username),this.AuthService.login(this.userlogin).then(function(_this){return function(data){var search;return _this.$log.debug("AuthService.login promise OK"),search=_this.$location.search(),_this.$location.path(search.action?search.action:"/").search({}),_this.flash.i18nSuccess("login_successful")}}(this))},LoginCtrl}(),authModule.controller("LoginCtrl",LoginCtrl)}).call(this);