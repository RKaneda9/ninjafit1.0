app.directive('popover', function () {

	return {
		restrict   : 'E',
		transclude : true,
		replace    : true,
		scope      : { show: '=show', msg: '=msg', dir: '@dir' },
		templateUrl: 'app/shared/popoverDirective.html',

		link: function (scope, elem, attrs) {
			scope.$watch(function (scope) { return scope.show; }, function (newValue, oldValue) {
				if (newValue) {
					var el = elem.find('input,select,textarea');
					if (el.length) { 
						if (el.focus) { el.focus(); }
						document.body.scrollTop = el.offset().top - 150; 
					}
				}
			});
		}
	};
});