var require = {
    baseUrl: "./",
    paths: {
        'angular-route': 'node_modules/angular-route/angular-route.min',
        'jquery': 'node_modules/jquery/dist/jquery.min',
        'angular': 'node_modules/angular/angular.min',
        'jquery-ui': 'node_modules/jquery-ui/jquery-ui',
        'i18next': 'bower_components/i18next/i18next',
        'moment': 'node_modules/moment/moment',
        'lodash': 'node_modules/lodash/index'
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
        }
    },

    deps: [
        'jquery',
        'jquery-ui',
        'angular',
        'angular-route',
        'i18next'
    ],

    callback: main
};