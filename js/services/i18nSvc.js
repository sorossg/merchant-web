'use strict';
app.factory('i18nSvc',
    [function () {
        var __lng = {};

        __lng.calendar = {
            greeting: i18n.t('greeting')
        };

        return {
            getLanguage: function (area) {
                return __lng[area];
            }
        }
    }]);