"use strict";

app.service("ShopInfoService", [function () {
    this.shopSettingInfos = {};
    this.shopWorkingTime = {};

    this.getTaskList = function () {
        var self = this;
        var tasks = [];

        self.shopWorkingTime.appointments.forEach(function (appt) {
            var task = {
                customer:appt.bookerInfo.displayName,
                service: self.__findServiceById(appt.details[0].productId),
                note: appt.notes,
                startTime: appt.fromTime,
                endTime: appt.toTime,
                day: moment(appt.scheduleDate).format("ddd DD")
            }
            tasks.push(task);
        });
        return tasks;
    };

    this.__findServiceById = function (productId) {
        var self = this;
        var product = _.find(self.shopSettingInfos.products, function (item) {
            return item.id == productId;
        });

        return product.productName;
    };
}]);