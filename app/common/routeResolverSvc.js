define(['angular'], function (angular) {
    'use strict';

    angular.module('routeResolver', []).provider('routeResolverSvc', function () {
        var self = this;

        self.$get = function () {
            return self;
        };

        self.route = function (routeConfig) {

            var resolve = function (baseName, template) {
                var routeDef = {};
                //    routeDef.templateUrl = routeConfig.getControllersDirectory() + baseName + '.html';
                routeDef.template = template;
                routeDef.resolve = {
                    load: ['$q', '$rootScope',
                        function ($q, $rootScope) {
                            var modulePath = [baseName.substring(0, baseName.lastIndexOf('/')) + "/index"];
                            var dependencies = [
                                baseName + 'Ctrl'
                            ];
                            return resolveDependencies($q, $rootScope, dependencies, modulePath);
                        }
                    ]
                };
                routeDef.controller = baseName.substring(baseName.lastIndexOf('/') + 1) + 'Ctrl';

                return routeDef;
            };

            var resolveDependencies = function ($q, $rootScope, dependencies, modulePath) {
                var defer = $q.defer();
                require(dependencies, function () {
                    defer.resolve();
                    $rootScope.$apply();
                });
                return defer.promise;
            };

            return {
                resolve: resolve
            };
        }(self.routeConfig);
    });
});
