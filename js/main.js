﻿'use strict';

var app = null;

(function main() {
    app = angular.module('merchantWeb',
        [
            'ngRoute'
        ]);

    app.config(['$routeProvider',function ($routeProvider) {
        $routeProvider
            .when('/', {controller: 'AppointmentController', templateUrl: 'templates/appointment.html'})
            .otherwise({
                redirectTo: '/'
            });

        var $i18nextProviderOptions = {
            lng: 'en',
            useCookie: false,
            useLocalStorage: false,
            fallbackLng: 'en',
            resGetPath: '/assets/translations/__lng__.json'
        };

        i18n.init($i18nextProviderOptions);
    }]);

    var manifest = [
        'js/services/i18nService',

        'js/appointment/AppointmentController',
        'js/calendar/CalendarController',
        'js/calendar/CalendarService',
        'js/calendar/TaskContainerDirective',
        'js/calendar/ColumnTitleDirective',
        'js/calendar/CalendarHeaderDirective',
        'js/calendar/CalendarBodyDirective',
        'js/calendar/CalendarRowDirective'
    ];

    require(manifest, function () {
        angular.bootstrap(document, ['merchantWeb']);
    })
}());
