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
                CalendarSvc.registerTasks(tasks);
                CalendarSvc.showTask();
            }, 500);
        };

        (function showView() {
            data.calendar = {
                timeAxis: ["6:00", "6:15", "6:30", "6:45", "7:00", "7:15", "7:30", "7:45", "8:00", "8:15", "8:30", "8:45", "9:00", "9:15", "9:30", "9:45", "10:00", "10:15", "10:30", "10:45", "11:00", "11:15", "11:30", "11:45", "12:00"],
                dayAxis: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
            };
            showTasks(tasks)
        }());

        fn.setEndTime = function ($event) {
            var $target = $($event.target);
            var $rowParent = $target.parents("tr");
            var $resizingTask = $rowParent.find(".isResizing");
            if (!$resizingTask.length) {
                return false;
            }
            var $currentTimePoint = $($event.target).parents(".task_container");
            var timePointWidth = $currentTimePoint.width();
            var newEndTime;
            var newTimePoint;

            //find new time point
            var coordinateX = $event.pageX;
            $rowParent.find(".task_container").each(function () {
                    //TODO: handle case of outside table
                    var offsetX = $(this).offset().left;
                    if ((coordinateX >= (offsetX - timePointWidth / 2)) && (coordinateX <= offsetX + timePointWidth / 2)) {
                        newTimePoint = $(this);
                    } else if ((coordinateX * 0.99 >= (offsetX - timePointWidth / 2)) && (coordinateX * 0.99 <= offsetX + timePointWidth / 2)){
                        newTimePoint = $(this);
                    } else if ((coordinateX * 1.01>= (offsetX - timePointWidth / 2)) && (coordinateX * 1.01 <= offsetX + timePointWidth / 2)){
                        newTimePoint = $(this);
                    }
                }
            );
            if (newTimePoint) {
                newEndTime = newTimePoint.attr("time");
                $resizingTask.attr("data-end_time", newEndTime);
                $resizingTask.attr("data-duration", getDuration());
            }
            setTaskElementWidth();

            function getDuration() {
                var startTime = $resizingTask.attr("data-start_time");
                var a = moment.duration(startTime);
                var b = moment.duration(newEndTime);
                return b.subtract(a).asMinutes();
            }

            function setTaskElementWidth() {
                var endTime;
                var startTime = $resizingTask.attr("data-start_time");
                if (newEndTime) {
                    endTime = newEndTime;
                } else {
                    endTime = $resizingTask.attr("data-end_time");
                }


                //determine end right point of task container
                var endCoordination = $rowParent.find("div[time='" + endTime + "']");
                var startCoordination = $rowParent.find("div[time='" + startTime + "']");

                //get distance between two coordination
                var taskElementWidth = endCoordination.offset().left - startCoordination.offset().left;
                //set width for task element
                $resizingTask.width(taskElementWidth);
            }
        };
    }]);