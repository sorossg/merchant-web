'use strict';

var app = null;

function main() {
    app = angular.module('merchantWeb',
        [
            'ngRoute'
        ]);

    app.config(['$routeProvider',function ($routeProvider) {
        $routeProvider
            .when('/', {controller: 'AppointmentCtrl', templateUrl: 'templates/appointment.html'})
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
        'js/services/i18nSvc',

        'js/appointment/AppointmentCtrl',
        'js/calendar/calendarCtrl'
    ];

    require(manifest, function () {
        angular.bootstrap(document, ['merchantWeb']);
    })
}
