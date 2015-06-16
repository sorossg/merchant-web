/**
 * Created by Hieu M.Tr on 6/15/2015.
 */
'use strict';

app.directive("taskContainer", [function () {
    return {
        restrict: "A",
        link: function ($scope, elm, attr) {
            var $elm = $(elm);
            var day = $elm.attr("day");
            var time = $elm.attr("time");

            if(day && time) {
                //make container droppable
                $elm.droppable({
                    tolerance: "intersect",
                    drop: function (event, ui) {
                        var $draggedElement = $(ui.helper[0]);
                        var $droppableElement = $(event.target);
                        var $task = $draggedElement.find(".task");
                        $draggedElement.appendTo($droppableElement);
                        var targetOffset = $droppableElement.offset();
                        $draggedElement.offset({top: targetOffset.top, left: targetOffset.left});

                        //get new datetime and change datetime of task
                        var day = $droppableElement.attr("day");
                        var startTime = $droppableElement.attr("time");
                        var duration = $task.attr("data-duration");
                        var endTime = moment(startTime, "HH:mm").add(duration, "m").format("HH:mm");
                        $task.attr("data-day", day);
                        $task.attr("data-start_time", startTime);
                        $task.attr("data-end_time", endTime);
                    }
                });
            }


        }
    }
}]);