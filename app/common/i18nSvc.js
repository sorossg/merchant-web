/**
 * Created by Hieu M.Tr on 6/12/2015.
 */
define([
    'application'
], function (app) {
    'use strict';
    app.register.factory('i18nSvc',
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
});