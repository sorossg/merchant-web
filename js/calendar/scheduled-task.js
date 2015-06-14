/**
 * Created by tiger on 14/06/2015.
 */
'use strict';
app.directive('scheduledTask',
    [function () {
        return {
            restrict: "A",
            compile: function (elm, attr) {
                var $elm = $(elm);
                var currentHeight = $elm.height();
                //make task draggable
                $elm.draggable({
                    handle: ".glyphicon"
                });

                //make task draggable


                $elm.resizable({
                    minHeight: currentHeight,
                    maxHeight: currentHeight,
                    start: function (event, ui) {
                        $elm.addClass("isResizing");
                    },
                    stop: function (event, ui) {
                        $elm.removeClass("isResizing");
                    }
                });
            }
        }
    }]);