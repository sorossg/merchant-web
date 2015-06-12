'use strict';
function main() {
    var manifest = [
        'application',
        'route',
        'app/common/i18nSvc',

        'app/calendar/calendarCtrl'
    ];
    require(manifest, function () {
        angular.bootstrap(document, ['merchantWeb']);
    })
}
