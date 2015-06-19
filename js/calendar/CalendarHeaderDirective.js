/**
 * Created by tiger on 15/06/2015.
 */
"use strict";

app.directive("ngCalendarHeader", ["$compile", function () {
    return {
        restrict: "A",
        scope: false,
        link: function (scope, elm) {
            var $elm = $(elm);
            var timeAxis = scope.data.calendar.timeAxis;
            var $th = $("#column_title");
            var $clone;
            timeAxis.forEach(function (timePoint, index) {
                $clone = $th.clone().appendTo($elm);
                if (!(index % 2)) {
                    $clone.find("p").text(timePoint);
                }
            });
            $th.remove();
        }
    }
}]);