'use strict';
app.controller('CalendarCtrl',
    ['$scope', '$element', 'i18nSvc', '$timeout', 'CalendarSvc', function ($scope, $element, i18nSvc, $timeout, CalendarSvc) {
        $scope.data = {};
        $scope.fn = {};
        $scope.i18n = i18nSvc.getLanguage("calendar");

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
                CalendarSvc.registerTasks(tasks);
                CalendarSvc.showTask();
            }, 500);
        };

        (function showView() {
            data.calendar = {
                timeAxis: CalendarSvc.timeAxis,
                dayAxis: CalendarSvc.dayAxis
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

            CalendarSvc.setEndTime($target,$rowParent,$resizingTask, $event.pageX );
        };
    }]);