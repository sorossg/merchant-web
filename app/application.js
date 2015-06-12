define([
        'main.cfg'
], function (config) {
    'use strict';

    var app = angular.module('merchantWeb',
    [
        'routeResolver',
        'ngRoute'
    ]);

    app.register = app;
    app.settings = config;

    app.config([
        '$controllerProvider',
        '$compileProvider',
        '$filterProvider',
        '$provide',
        function (
            $controllerProvider,
            $compileProvider,
            $filterProvider,
            $provide
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
        }
    ]);
    return app;
});