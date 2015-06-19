/**
 * Created by Hieu M.Tr on 6/16/2015.
 */
'use strict';



app.directive("ngCalendarBody", ["$compile",function ($compile) {
    return {
        restrict: "A",
        priority: 1,
        link: function (scope, elm) {
            var $elm = $(elm);
            var $tr = $elm.find("#table_row");
            var dayAxis = scope.data.calendar.dayAxis;
            var $clone;
            $tr.attr("isRender", "true");

            dayAxis.forEach(function (day) {
                $clone = $tr.clone();
                var $weekday = $clone.find(".week_day");
                var $taskContainer = $clone.find(".task_container");
                $weekday.text(day);
                $taskContainer.attr("day", day);
                $clone.appendTo($elm);
                $compile($clone)(scope);
            });
            $tr.remove();
        }
    }
}]);