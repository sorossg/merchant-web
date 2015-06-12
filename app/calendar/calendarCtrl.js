﻿define([
    'application'
], function (app) {
    'use strict';
    app.register.controller('calendarCtrl',
        ['$scope', 'i18nSvc', function ($scope, i18nSvc) {
            $scope.data = {};
            $scope.fn = {};

            var data = $scope.data;
            var fn = $scope.fn;

            $scope.i18n = i18nSvc.getLanguage("calendar");

            data.tasks = [
                {
                    title: "task 1",
                    startTime: "6:15",
                    endTime: "7:15",
                    day: "Tuesday"
                }, {
                    title: "task 2",
                    startTime: "8:15",
                    endTime: "10:15",
                    day: "Wednesday"
                }, {
                    title: "task 3",
                    startTime: "10:00",
                    endTime: "10:15",
                    day: "Thursday"
                }, {
                    title: "task 4",
                    startTime: "9:15",
                    endTime: "10:00",
                    day: "Friday"
                }
            ];

            (function showView() {
                data.calendar = {
                    timeAxis: ["6:00", "6:15", "6:30", "6:45", "7:00", "7:15", "7:30", "7:45", "8:00", "8:15", "8:30", "8:45", "9:00", "9:15", "9:30", "9:45", "10:00", "10:15", "10:30", "10:45", "11:00","11:15", "11:30", "11:45","12:00"],
                    dayAxis: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
                };
            }());



            var showTasks = function (tasks) {

            }
        }]);
});