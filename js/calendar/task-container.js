/**
 * Created by Hieu M.Tr on 6/15/2015.
 */
app.directive("taskContainer", [function () {
    return {
        restrict: "A",
        link: function ($scope, elm, attr) {
            var $elm = $(elm);

            //make container droppable
            $elm.droppable({
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
        }
    }
}]);