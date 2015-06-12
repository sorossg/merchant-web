define(function () {
    return {
        baseUrl: "./",
        paths: {
            'application': 'app/application',
            'routeResolver': 'app/common/routeResolverSvc',
            'route': 'app/route',
            'configuration': 'app/configuration',
            'angular': 'node_modules/angular/angular.min',
            'angular-route': 'node_modules/angular-route/angular-route.min',
            'jquery': 'node_modules/jquery/dist/jquery.min',
            'jQuery-ui': 'node_modules/jquery-ui/jquery-ui',
            'moment': 'node_modules/moment/moment',
            'lodash': 'node_modules/lodash/index',
            'text': 'node_modules/requirejs-text/text',
            'i18next': 'bower_components/i18next/i18next.amd.min'
        },

        shim: {
            'jquery': {
                'exports': '$'
            },
            'jQuery-ui': {
                'deps': ['jquery']
            },
            'angular': {
                'exports': 'angular'
            },
            'angular-route': {
                'deps': ['angular']
            }
        }
    };
});