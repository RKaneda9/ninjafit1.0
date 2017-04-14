app.controller('wod', function ($scope, warehouseService, constants) {

	$scope.imageList    = constants.images.wod;
	$scope.wods         = [];
	$scope.initializing = true;

	function parseWods (wods) {
		if (!wods || !(wods instanceof Array)) { return []; }

		return wods.map(function (wod) {
			return {
				title    : wod.title,
				trackBy  : wod.trackBy,
				contents : wod.contents && wod.contents instanceof Array ? wod.contents.map(parseContent) : []
			};
		});
	}

	function parseContent (content) { 
		return content.split('&nbsp;').join(' ');
	}

	warehouseService
		.getWods()
		.then   (function (wods) { $scope.wods         = parseWods(wods);  })
		.finally(function ()     { $scope.initializing = false; });
});