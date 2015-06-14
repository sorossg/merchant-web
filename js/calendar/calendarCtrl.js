'use strict';
app.controller('calendarCtrl',
    ['$scope', '$element', 'i18nSvc', '$timeout', function ($scope, $element, i18nSvc, $timeout) {
        $scope.data = {};
        $scope.fn = {};
        $scope.i18n = i18nSvc.getLanguage("calendar");

        var data = $scope.data;
        var fn = $scope.fn;

        var tasks = [
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

        var showTasks = function (tasks) {
            $timeout(function () {
                data.tasks = tasks;
            }, 500);
        };

        (function showView() {
            data.calendar = {
                timeAxis: ["6:00", "6:15", "6:30", "6:45", "7:00", "7:15", "7:30", "7:45", "8:00", "8:15", "8:30", "8:45", "9:00", "9:15", "9:30", "9:45", "10:00", "10:15", "10:30", "10:45", "11:00", "11:15", "11:30", "11:45", "12:00"],
                dayAxis: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
            };
            showTasks(tasks)
        }());

    }]);