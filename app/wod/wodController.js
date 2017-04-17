app.controller('wod', function ($scope, warehouseService, constants) {

	$scope.imageList    = constants.images.wod;
	$scope.wods         = [];
	$scope.initializing = true;

	function parseWods (data) {
		var wods = data && typeof data == 'object' ? data.workouts : null;

		if (!wods || !(wods instanceof Array)) { return []; }

		return wods.map(function (wod) {
			return {
				title    : wod.title,
				subtitle : wod.subtitle,
				contents : wod.contents
			};
		});
	}

	warehouseService
		.getWods()
		.then   (function (result) { $scope.wods         = parseWods(result); })
		.finally(function ()       { $scope.initializing = false; });
});