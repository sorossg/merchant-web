'use strict';
app.controller('CalendarController',
    ['$scope',
        'i18nService',
        '$timeout',
        'CalendarService',
        'ShopInfoService',
        'ShopResourceService',
        function ($scope,
                  i18nService,
                  $timeout,
                  CalendarService,
                  ShopInfoService,
                  ShopResourceService) {
            $scope.data = {};
            $scope.fn = {};
            $scope.i18n = i18nService.getLanguage("calendar");

            var data = $scope.data;
            var fn = $scope.fn;

            var tasks = [
                {
                    id: 1,
                    customer: "CustomerA",
                    service: "service A",
                    note: "some text",
                    startTime: "8:00",
                    endTime: "11:15",
                    day: "Tue 16"
                }, {
                    id: 2,
                    customer: "CustomerB",
                    service: "service A",
                    note: "some text",
                    startTime: "8:15",
                    endTime: "10:15",
                    day: "Wed 17"
                }, {
                    id: 3,
                    customer: "CustomerC",
                    service: "service A",
                    note: "some text",
                    startTime: "10:00",
                    endTime: "10:30",
                    day: "Thu 18"
                }, {
                    id: 4,
                    customer: "CustomerD",
                    service: "service A",
                    note: "some text",
                    startTime: "9:15",
                    endTime: "10:00",
                    day: "Fri 19"
                }
            ];

            (function showView() {
                data.calendar = {
                    timeAxis: CalendarService.timeAxis,
                    dayAxis: CalendarService.dayAxis
                };
                ShopResourceService.getShopSettingsInfos(2142).then(registerShopSettingInfo);
            }());

            fn.setEndTime = function ($event) {
                var $target = $($event.currentTarget);
                var $rowParent = $target.parents("tr");
                var $resizingTask = $rowParent.find(".isResizing");
                if (!$resizingTask.length) {
                    return false;
                }

                CalendarService.setEndTime($target, $rowParent, $resizingTask, $event.pageX);
            };

            function registerShopSettingInfo(data) {
                ShopInfoService.shopSettingInfos = data;
                ShopResourceService.getShopWorkingSchedule(2142, "2015/06/18", "2015/06/19").then(showTask);
            }

            function showTask(data) {
                ShopInfoService.shopWorkingTime = data;
                data.tasks = ShopInfoService.getTaskList();
                CalendarService.registerTasks(data.tasks);
                CalendarService.startShowTask();
            }
        }]);