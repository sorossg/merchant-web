/**
 * Created by tiger on 14/06/2015.
 */
'use strict';

app.factory("CalendarService", ["$compile","$interval","$timeout","$templateCache", function ($compile, $interval, $timeout, $templateCache) {
    function Calendar() {
        this.taskElements = [];
        this.taskTemplate = $templateCache.get("templates/appointment_details_partial.html");
        this.$calendar = $('#calendar');
        this.timeAxis = ["8:00", "8:15", "8:30", "8:45", "9:00", "9:15", "9:30", "9:45", "10:00", "10:15", "10:30", "10:45", "11:00", "11:15", "11:30", "11:45", "12:00", "12:15", "12:30", "12:45", "13:00", "13:15", "13:30", "13:45", "14:00", "14:15", "14:30", "14:45", "15:00","15:15", "15:30", "15:45", "16:00", "16:15", "16:30", "16:45", "17:00"];
        this.dayAxis = this.__decorateDayAxisData();
    }

    Calendar.prototype.registerTasks = function (tasks) {
        var self = this;
        tasks.forEach(function (task) {
            var taskDuration = self.__getDuration(task.startTime, task.endTime);
            var $taskWrapper = $(self.taskTemplate);
            var $taskElement = $taskWrapper.find(".task");
            $taskWrapper.find(".customer_name").text(task.customer);
            $taskWrapper.find(".service_name").text(task.service);
            $taskWrapper.find(".appointment_note").text(task.note);
            $taskElement.attr("data-start_time", task.startTime);
            $taskElement.attr("data-end_time", task.endTime);
            $taskElement.attr("data-day", task.day);
            $taskElement.attr("data-duration", taskDuration);
            $taskElement.appendTo($taskWrapper);
            self.taskElements.push($taskWrapper);
        })
    };

    Calendar.prototype.startShowTask = function () {
        var self = this;
        var finalDay = _.last(self.dayAxis);
        var finalTime = _.last(self.timeAxis);
        var checkDoneRenderCalendar = $interval(function () {
            var finalCell = self.$calendar.find("div[day='" + finalDay + "'][time='" + finalTime + "']");
            if (finalCell.length){
                self.showTask();
                $interval.cancel(checkDoneRenderCalendar);
            }
        }, 500);

        $timeout(function () {
            console.log("something is wrong with rendering calendar");
            $interval.cancel(checkDoneRenderCalendar);
        }, 150000);
    };

    Calendar.prototype.showTask = function () {
        var self = this;
        self.populateTasks();
        var task;
        self.taskElements.forEach(function (taskWrapper) {
            task = taskWrapper.find(".task");
            self.__setWidthTaskElement(task);
            self.__makeTaskDraggable(taskWrapper);
            self.__makeTaskResizable(task)
        })
    };

    Calendar.prototype.populateTasks = function () {
        var self = this;
        self.taskElements.forEach(function (taskWrapper) {
            var task = taskWrapper.find(".task");
            var day = task.attr("data-day");
            var startTime = task.attr("data-start_time");
            var taskContainer = self.$calendar.find("div[day='" + day + "'][time='" + startTime + "']");
            taskWrapper.appendTo(taskContainer);
            $compile(taskWrapper);
        })
    };

    Calendar.prototype.__setWidthTaskElement = function ($taskElement) {
        var pixelPerMinute = this.__calculatePixelPerMinute();
        var taskDuration = $taskElement.attr("data-duration");
        var taskElementWidth = taskDuration * pixelPerMinute;
        $taskElement.width(taskElementWidth);
    };

    Calendar.prototype.__makeTaskDraggable = function ($taskWrapper) {
        var self = this;
        $taskWrapper.draggable({
            handle: ".task",
            start: function () {
                self.$calendar.find("tbody").find("tr").css("overflow-x", "visible");
            },
            stop: function () {
                self.$calendar.find("tbody").find("tr").css("overflow-x", "hidden");
            }
        });
    };

    Calendar.prototype.__makeTaskResizable = function ($taskElement) {
        var currentHeight = $taskElement.height();
        $taskElement.resizable({
            handles: "e",
            start: function (event, ui) {
                $taskElement.addClass("isResizing");
            },
            stop: function (event, ui) {
                $taskElement.removeClass("isResizing");
            }
        });
    };

    Calendar.prototype.setEndTime = function ($target, $rowParent, $resizingTask, coordinateX) {
        var $rowParent = $target.parents("tr");
        var taskContainerWidth = this.__calculateTaskContainerWidth();
        var newTimePoint = null;
        //find new time point
        $rowParent.find(".task_container").each(function () {
                //TODO: handle case of outside table
                var offsetX = $(this).offset().left;
                if ((coordinateX <= offsetX) && (coordinateX >= offsetX - taskContainerWidth)) {
                    newTimePoint = $(this);
                }
            }
        );
        if (newTimePoint) {
            var startTime = $resizingTask.attr("data-start_time");
            var newEndTime = newTimePoint.attr("time");
            $resizingTask.attr("data-end_time", newEndTime);
            $resizingTask.attr("data-duration", this.__getDuration(startTime, newEndTime));
        }

        this.__setWidthTaskElement($resizingTask);
    };

    Calendar.prototype.__calculatePixelPerMinute = function () {
        var timeRange = this.__getDuration(_.first(this.timeAxis), _.last(this.timeAxis));
        var rowWidth = this.__calculateTaskContainRowWidth();
        return rowWidth / timeRange
    };

    Calendar.prototype.__calculateTaskContainRowWidth = function () {
        var taskContainingRow = this.$calendar.find("tbody").find("tr")[0];
        var $timePoint = $(taskContainingRow).find(".time_point");
        var numberOfTimePoint = $timePoint.length;
        var timePointWidth = this.__calculateTaskContainerWidth();

        return timePointWidth * (numberOfTimePoint - 1);
    };

    Calendar.prototype.__calculateTaskContainerWidth = function () {
        var taskContainingRow = this.$calendar.find("tbody").find("tr")[0];
        var $timePoint = $(taskContainingRow).find(".time_point");
        return $($timePoint[1]).offset().left - $($timePoint[0]).offset().left;
    };

    Calendar.prototype.__decorateDayAxisData = function () {
        var result = [];
        for (var i = 0; i <= 6; i++) {
            result.push(moment().day(i).format("ddd DD"));
        }
        return result;
    };

    Calendar.prototype.__getDuration = function (startTime, endTime) {
        var a = moment.duration(startTime);
        var b = moment.duration(endTime);
        return b.subtract(a).asMinutes();
    };
    return new Calendar();
}]);