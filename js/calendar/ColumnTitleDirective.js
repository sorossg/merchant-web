/**
 * Created by tiger on 15/06/2015.
 */
"use strict";

app.directive("ngColumnTitle",[function(){
    return {
        restrict: 'A',
        scope: false,
        link: function (scope,elm) {
            var order = parseInt($(elm).attr("data-order"));
            //config display of element
            if(order %2) {
                $(elm).css("visibility", "hidden");
            }
        }
    }
}]);