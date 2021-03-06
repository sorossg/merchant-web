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
            resGetPath: 'assets/translations/__lng__.json'
        };

        i18n.init($i18nextProviderOptions);
    }]);

    var manifest = [
        'js/services/i18nService',
        'js/services/ShopResourceService',
        'js/services/AjaxService',
        'js/services/StorageService',

        'js/common/Configuration',

        'js/appointment/AppointmentController',
        'js/calendar/CalendarController',
        'js/calendar/CalendarService',
        'js/calendar/TaskContainerDirective',
        'js/calendar/ColumnTitleDirective',
        'js/calendar/CalendarHeaderDirective',
        'js/calendar/CalendarBodyDirective',
        'js/calendar/CalendarRowDirective',
        'js/calendar/ShopInfoService'
    ];

    var templates = [
      'templates/appointment_details_partial.html'
    ];

    app.run(["$templateRequest","$templateCache",function ($templateRequest, $templateCache) {
        templates.forEach(function (template) {
            $templateRequest(template).then(function (data) {
                $templateCache.put(template, data);
            });
        })
    }]);

    require(manifest, function () {
        angular.bootstrap(document, ['merchantWeb']);
    })
}());
