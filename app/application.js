define([
        'angular',
        './configuration'
], function (angular, configuration) {
    'use strict';

    var app = angular.module('merchantWeb',
    [
        'routeResolver',
        'ngRoute',
        'jm.i18next'
    ]);

    app.register = app;
    app.configuration = configuration;

    app.config([
        '$routeProvider',
        'routeResolverSvcProvider',
        '$controllerProvider',
        '$compileProvider',
        '$filterProvider',
        '$provide',
        '$i18nextProvider',
        function ($routeProvider,
            routeResolverSvc,
            $controllerProvider,
            $compileProvider,
            $filterProvider,
            $provide,
            $i18nextProvider
            ) {

            app.register = {
                controller: $controllerProvider.register,
                directive: $compileProvider.directive,
                filter: $filterProvider.register,
                factory: $provide.factory,
                service: $provide.service
            };

            var $i18nextProviderOptions = {
                lng: 'en',
                useCookie: false,
                useLocalStorage: false,
                fallbackLng: 'en',
                resGetPath: '/json/translations/__lng__.json'
            };

            i18n.init($i18nextProviderOptions);

            $i18nextProvider.options = $i18nextProviderOptions
        }
    ]);
    return app;
});