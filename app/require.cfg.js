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
            'ng-i18next': 'bower_components/ng-i18next/dist/ng-i18next.min',
            'i18next': 'bower_components/i18next/i18next.min',
            'ng-sanitize': 'bower_components/angular-sanitize/angular-sanitize.min'
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
            },
            'ng-i18next': {
                'deps': ['angular','i18next', 'ng-sanitize']
            },

            'ng-sanitize': {
                'deps': ['angular']
            }
        }
    };
});