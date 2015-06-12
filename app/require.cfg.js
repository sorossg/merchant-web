define(function () {
    return {
        baseUrl: "./",
        paths: {
            'main': 'app/main',
            'application': 'app/application',
            'routeResolver': 'app/common/routeResolverSvc',
            'route': 'app/route',
            'main.cfg': 'app/main.cfg',
            'angular': 'node_modules/angular/angular.min',
            'angular-route': 'node_modules/angular-route/angular-route.min',
            'jquery': 'node_modules/jquery/dist/jquery.min',
            'jquery-ui': 'node_modules/jquery-ui/jquery-ui',
            'moment': 'node_modules/moment/moment',
            'lodash': 'node_modules/lodash/index',
            'text': 'node_modules/requirejs-text/text',
            'i18next': 'bower_components/i18next/i18next'
        },

        shim: {
            'jquery': {
                'exports': '$'
            },
            'jquery-ui': {
                'deps': ['jquery']
            },
            'angular': {
                'exports': 'angular'
            },
            'angular-route': {
                'deps': ['angular']
            },
            'routeResolver': {
                'deps': ['angular']
            }
        },

        deps: [
            'jquery',
            'jquery-ui',
            'angular',
            'angular-route',
            'i18next',
            'routeResolver'
        ],

        callback: main
    };
})
;