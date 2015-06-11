define([
    'application',
    'text!app/calendar/calendar.html'
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
                .when('/', route.resolve('app/calendar/calendar', args[1]))
                .otherwise({
                    redirectTo: '/'
                });
        }
    ]);
});
