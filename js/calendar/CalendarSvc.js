/**
 * Created by tiger on 14/06/2015.
 */
app.factory("CalendarSvc", ["$compile", function ($compile) {
    function Calendar() {
        this.taskElements = [];
        this.$calendar = $('#calendar');
        this.timeAxis = ["6:00", "6:15", "6:30", "6:45", "7:00", "7:15", "7:30", "7:45", "8:00", "8:15", "8:30", "8:45", "9:00", "9:15", "9:30", "9:45", "10:00", "10:15", "10:30", "10:45", "11:00", "11:15", "11:30", "11:45", "12:00"];
        this.dayAxis = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    }

    Calendar.prototype.registerTasks = function (tasks) {
        var self = this;
        tasks.forEach(function (task) {
            var taskDuration = self.__getDuration(task.startTime, task.endTime);
            var taskElement = $("<div class='task' data-start_time='' data-end_time='' data-day=''></div>");
            $("<span class='glyphicon glyphicon-move' aria-hidden='true'></span>").appendTo(taskElement);
            $("<span></span>").text(task.title).appendTo(taskElement);
            taskElement.attr("data-start_time", task.startTime);
            taskElement.attr("data-end_time", task.endTime);
            taskElement.attr("data-day", task.day);
            taskElement.attr("data-duration", taskDuration);
            self.taskElements.push(taskElement);
        })
    };

    Calendar.prototype.showTask = function () {
        var self = this;
        self.populateTasks();
        self.taskElements.forEach(function (task) {
            self.__setWidthTaskElement(task);
            self.__makeTaskDraggable(task);
            self.__makeTaskResizable(task)
        })
    };

    Calendar.prototype.populateTasks = function () {
        var self = this;
        self.taskElements.forEach(function (task) {
            var day = task.attr("data-day");
            var startTime = task.attr("data-start_time");
            var taskContainer = self.$calendar.find("div[day='" + day + "'][time='" + startTime + "']");
            task.appendTo(taskContainer);
            $compile(task);
        })
    };

    Calendar.prototype.__setWidthTaskElement = function (task) {
        var pixelPerMinute = this.__calculatePixelPerMinute();
        var taskDuration = task.attr("data-duration");
        var taskElementWidth = taskDuration * pixelPerMinute;
        task.width(taskElementWidth);
    };

    Calendar.prototype.__makeTaskDraggable = function ($taskElement) {
        $taskElement.draggable({
            handle: ".glyphicon"
        });
    };

    Calendar.prototype.__makeTaskResizable = function ($taskElement) {
        var currentHeight = $taskElement.height();
        $taskElement.resizable({
            minHeight: currentHeight,
            maxHeight: currentHeight,
            start: function (event, ui) {
                $taskElement.addClass("isResizing");
            },
            stop: function (event, ui) {
                $taskElement.removeClass("isResizing");
            }
        });
    };

    Calendar.prototype.setEndTime = function ($target,$rowParent, $resizingTask, coordinateX) {
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
        var rowWidth = this.__calculateTaskContainAreaWidth();
        return rowWidth / timeRange
    };

    Calendar.prototype.__calculateTaskContainAreaWidth = function () {
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

    Calendar.prototype.__getDuration = function (startTime, endTime) {
        var a = moment.duration(startTime);
        var b = moment.duration(endTime);
        return b.subtract(a).asMinutes();
    };

    return new Calendar();
}]);