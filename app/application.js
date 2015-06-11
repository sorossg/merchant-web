define([
        'angular',
        './configuration'
], function (angular, configuration) {
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
            $provide
            ) {

            app.register = {
                controller: $controllerProvider.register,
                directive: $compileProvider.directive,
                filter: $filterProvider.register,
                factory: $provide.factory,
                service: $provide.service
            };
        }
    ]);
    return app;
});