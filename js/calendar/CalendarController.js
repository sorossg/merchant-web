﻿'use strict';
app.controller('CalendarController',
    ['$scope', 'i18nService', '$timeout', 'CalendarService', function ($scope, i18nService, $timeout, CalendarService) {
        $scope.data = {};
        $scope.fn = {};
        $scope.i18n = i18nService.getLanguage("calendar");

        var data = $scope.data;
        var fn = $scope.fn;

        var tasks = [
            {
                id: 1,
                title: "task 1",
                startTime: "6:15",
                endTime: "7:15",
                day: "Tuesday"
            }, {
                id: 2,
                title: "task 2",
                startTime: "8:15",
                endTime: "10:15",
                day: "Wednesday"
            }, {
                id: 3,
                title: "task 3",
                startTime: "10:00",
                endTime: "10:15",
                day: "Thursday"
            }, {
                id: 4,
                title: "task 4",
                startTime: "9:15",
                endTime: "10:00",
                day: "Friday"
            }
        ];

        var showTasks = function (tasks) {
            $timeout(function () {
                data.tasks = tasks;
                CalendarService.registerTasks(tasks);
                CalendarService.showTask();
            }, 500);
        };

        (function showView() {
            data.calendar = {
                timeAxis: CalendarService.timeAxis,
                dayAxis: CalendarService.dayAxis
            };
            showTasks(tasks)
        }());

        fn.setEndTime = function ($event) {
            var $target = $($event.currentTarget);
            var $rowParent = $target.parents("tr");
            var $resizingTask = $rowParent.find(".isResizing");
            if (!$resizingTask.length) {
                return false;
            }

            CalendarService.setEndTime($target,$rowParent,$resizingTask, $event.pageX );
        };
    }]);