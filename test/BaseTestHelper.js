this.commonModule = angular.module('myApp.common',[]);
this.i18nModule = angular.module('myApp.i18n', ['myApp.common', 'pascalprecht.translate'])
this.filtersModule = angular.module('myApp.filters', ['myApp.i18n']);

this.i18nModule.config(function ($translateProvider, $provide) {
    $translateProvider.translations('en', { 'form_validation_error_url': 'Invalid URL', 'flash_success': 'Success', 'flash_error': 'Error occurred' });
    $translateProvider.translations('pl', { 'form_validation_error_url': 'Nieprawidłowy URL', 'flash_success': 'Sukces', 'flash_error': 'Błąd' });
    $translateProvider.fallbackLanguage('en');
    $translateProvider.preferredLanguage('en'); //to change the language in application use service $translate.use('locale');
});