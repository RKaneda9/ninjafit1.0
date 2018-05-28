app.directive('appNav', function ($rootScope, $state, constants) {

    var Nav = function (scope, elem, attrs) {

        scope.route    = 'home';
        scope.isOpen   = false;
        scope.isMobile = constants.isMobile();
        scope.social   = Object.keys(constants.contact.social).map(function (key) {
            return { type: key, url: constants.contact.social[key] };
        });

        scope.toggle = function () { scope.isOpen = !scope.isOpen; };

        scope.goTo = function (stateName) {
            scope.isOpen = false;

            if (stateName === 'bringtheruckus') {
                window.location = "https://beambitious.clickfunnels.com/sales-page20748799";
            }

            if (stateName === 'login') {
                window.location = "https://ninjafitgyms.sites.zenplanner.com/login.cfm";
            }
            else {
                $state.go(stateName);
            }
        };

        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            scope.route = toState.name;
        });
    };

    return {
        restrict:    "E",
        transclude:  true,
        replace:     true,
        link:        Nav,
        templateUrl: 'app/appNav/appNavDirective.html'
    };
});
