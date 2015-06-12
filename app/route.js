define([
    'application',
    'text!app/home/home.html'
], function (app) {
    'use strict';
    var args = arguments;
    app.config([
        '$routeProvider',
        'routeResolverSvcProvider',
        function ($routeProvider, routeResolverSvcProvider) {
            //Define routes - controllers will be loaded dynamically
            var route = routeResolverSvcProvider.route;
            $routeProvider
                .when('/', route.resolve('app/home/home', args[1]))
                .otherwise({
                    redirectTo: '/'
                });
        }
    ]);
});
