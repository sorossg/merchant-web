define([
    'application'
], function (app) {
    'use strict';
    app.register.controller('calendarCtrl',
        ['$scope', function ($scope) {
            $scope.data = {};
            $scope.fn = {};

            var data = $scope.data;
            var fn = $scope.fn;

            data.greeting = "Halo!!";

            fn.greeting = function () {
                alert("halo!!")
            }
        }]);
});