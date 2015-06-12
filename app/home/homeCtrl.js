/**
 * Created by Hieu M.Tr on 6/12/2015.
 */
define([
    'application'
], function (app) {
    'use strict';
    app.register.controller('homeCtrl',
        ['$scope',function ($scope) {
            $scope.data = {};

            var data = $scope.data;

            data.test = "test";
        }]);
});