/**
 * Created by Hieu M.Tr on 6/16/2015.
 */
'use strict';

app.directive("ngCalendarRow", ["$compile",function ($compile) {
    return {
        restrict: "A",
        scope:false,
        link: function (scope, elm) {
            var $elm = $(elm);
            var isRender = Boolean($elm.attr("isRender"));
            
            if(isRender){
                var $td = $elm.find("#table_cell");
                var timeAxis = scope.data.calendar.timeAxis;
                var $clone;

                timeAxis.forEach(function (time) {
                    $clone = $td.clone();
                    var $taskContainer = $clone.find(".task_container");
                    $taskContainer.attr("time",time);
                    $clone.appendTo($elm);
                    $compile($clone)(scope);
                });
                $td.remove();
            }
        }
    }
}]);