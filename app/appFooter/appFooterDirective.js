app.directive('appFooter', function () {

	return {
		restrict:    "E",
		transclude:  true,
		replace:     true,
		templateUrl: 'app/appFooter/appFooterDirective.html',
		link:        function () { }
	};
});