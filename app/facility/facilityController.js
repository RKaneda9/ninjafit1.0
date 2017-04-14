app.controller('facility', function ($scope, constants) {
	$scope.initializing  = false;
	$scope.images        = constants.images.facility;
	$scope.showPreviewer = false;
	$scope.activeImage   = 0;
	$scope.previewImage  = function (i) {
		
		$scope.activeImage   = i;
		$scope.showPreviewer = true;
	};
});