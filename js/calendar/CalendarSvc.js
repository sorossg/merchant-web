/**
 * Created by tiger on 14/06/2015.
 */
app.factory("CalendarSvc", ["$compile", function ($compile) {
    function Calendar() {
        this.tasks = [];
        this.$calendar = $('#calendar');
        this.$taskContainer = $('.task_container');
        this.PIXCEL_PER_MINUTE = 50 / 15;
        this.TASK_CONTAINER_WIDTH = 50;

        this.$taskContainer.css({
            position: "absolute",
            top: 0,
            height: "50px",
            width: "232px"
        });
        this.__makeTaskContainerDroppable();
    }

    Calendar.prototype.registerTasks = function (tasks) {
        var self = this;
        tasks.forEach(function (task) {
            task.duration = self.__getDuration(task.startTime, task.endTime)
            var taskElement = $("<div class='task' data-start_time='' data-end_time='' data-day=''></div>");
            $("<span class='glyphicon glyphicon-move' aria-hidden='true'></span>").appendTo(taskElement);
            $("<span></span>").text(task.title).appendTo(taskElement);
            taskElement.attr("data-start_time", task.startTime);
            taskElement.attr("data-end_time", task.endTime);
            taskElement.attr("data-day", task.day);
            taskElement.attr("data-duration", task.duration);
            task.taskElement = taskElement;
            self.tasks.push(task);
        })
    };

    Calendar.prototype.showTask = function () {
        var self = this;
        self.populateTasks();
        self.tasks.forEach(function (task) {
            self.__setWidthTaskElement(task);
            self.__makeTaskDraggable(task.taskElement);
            self.__makeTaskResizable(task.taskElement)
        })
    };

    Calendar.prototype.populateTasks = function () {
        var self = this;
        self.tasks.forEach(function (task) {
            var taskContainer = self.$calendar.find("div[day='" + task.day + "'][time='" + task.startTime + "']");
            task.taskElement.appendTo(taskContainer);
            $compile(task.taskElement);
        })
    };

    Calendar.prototype.__setWidthTaskElement = function (task) {
        var taskElementWidth = task.duration * this.PIXCEL_PER_MINUTE;
        task.taskElement.width(taskElementWidth);
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

    Calendar.prototype.__makeTaskContainerDroppable = function () {
        var self = this;
        self.$taskContainer.each(function () {
            $(this).droppable({
                tolerance: "pointer",
                drop: function (event, ui) {
                    var draggedElement = ui.helper[0];
                    var droppableElement = event.target;
                    $(draggedElement).appendTo(droppableElement);
                    var targetOffset = $(droppableElement).offset();
                    $(draggedElement).offset({top: targetOffset.top, left: targetOffset.left});

                    //get new datetime and change datetime of task
                    var day = $(droppableElement).attr("day");
                    var startTime = $(droppableElement).attr("time");
                    var duration = $(draggedElement).attr("data-duration");
                    var endTime = moment(startTime, "hh:mm").add(duration, "m").format("hh:mm");
                    $(draggedElement).attr("data-day", day);
                    $(draggedElement).attr("data-start_time", startTime);
                    $(draggedElement).attr("data-end_time", endTime);
                }
            });
        });
    };

    Calendar.prototype.setEdDTime  = function(){

    };

    Calendar.prototype.__getDuration = function (startTime, endTime) {
        var a = moment.duration(startTime);
        var b = moment.duration(endTime);
        return b.subtract(a).asMinutes();
    };

    return new Calendar();
}]);