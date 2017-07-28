app.directive('notifications', function (notificationsService) {

    var Notifications = function (scope, elem, attrs) {

        scope.notifications = notificationsService.notifications;

        scope.remove = function (id) { notificationsService.remove(id); };

        scope.addError   = function (msg, duration) { notificationsService.addError  (msg, duration); };
        scope.addSuccess = function (msg, duration) { notificationsService.addSuccess(msg, duration); };
        scope.addInfo    = function (msg, duration) { notificationsService.addInfo   (msg, duration); };
        scope.addWarning = function (msg, duration) { notificationsService.addWarning(msg, duration); };
    };

    return {
        restrict:    "E",
        transclude:  true,
        replace:     true,
        link:        Notifications,
        templateUrl:'app/shared/notificationsDirective.html'
    };
});