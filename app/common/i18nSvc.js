/**
 * Created by Hieu M.Tr on 6/12/2015.
 */
define([
    'application',
    'i18next'
], function (app, i18next) {
    'use strict';
    app.register.factory('i18nSvc',
        [function () {
            var i18n = {};

            i18n.calendar = {
                greeting: i18next.t('greeting')
            };

            return {
                getLanguage: function (area) {
                    return i18n[area];
                }
            }
        }]);
});