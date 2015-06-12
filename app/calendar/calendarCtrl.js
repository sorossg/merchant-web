define([
    'application',
    'app/common/i18nSvc'
], function (app) {
    'use strict';
    app.register.controller('calendarCtrl',
        ['$scope','i18nSvc', function ($scope, i18nSvc) {
                $scope.data = {};
                $scope.fn = {};

                var data = $scope.data;
                var fn = $scope.fn;

                $scope.i18n = i18nSvc.getLanguage("calendar");

                fn.greeting = function () {
                   $scope.i18n.greeting = "test binding";
                }
            }]);
});