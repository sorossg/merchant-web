define([
        'angular',
        './configuration',
        'i18next'
], function (angular, configuration, i18next) {
    'use strict';

    var app = angular.module('merchantWeb',
    [
        'routeResolver',
        'ngRoute'
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

            i18next.init($i18nextProviderOptions);
        }
    ]);
    return app;
});