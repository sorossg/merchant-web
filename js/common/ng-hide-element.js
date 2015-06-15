/**
 * Created by Hieu M.Tr on 6/15/2015.
 */
app.directive("ngHideElement", function () {
   return {
       restrict: "A",
       link: function (scope, elm) {
           var isHidden = Boolean($(elm).attr("data-is-hidden"));
           if (isHidden){
               $(elm).css('visibility','hidden');
           } else {
               $(elm).css('visibility','visible');
           }
       }
   }
});