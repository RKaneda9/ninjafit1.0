app.directive('imageCollection', function ($timeout) {

	return {
		restrict   : 'E',
		transclude : false,
		replace    : true,
		templateUrl: 'app/images/imageCollectionDirective.html',
		scope      : { images: '=images' },

		link: function (scope, elem, attrs) {

			var id, changeTime = 10000;
			
			if (!(scope.images instanceof Array && scope.images.length)) { scope.images = []; }

			scope.index    = 0;
			scope.showBtns = scope.images.length > 1;
			scope.next     = function () { check(++scope.index); setChange(); };
			scope.prev     = function () { check(--scope.index); setChange(); };

			function setChange () {

				$timeout.cancel(id);
				id = $timeout(scope.next, changeTime);
			}

			function check () {

				if (scope.index >= scope.images.length) { return (scope.index = 0); }

				if (scope.index < 0) { return (scope.index = scope.images.length - 1); }
			}

			setChange();
		}
	};
});