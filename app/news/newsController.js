app.controller('news', function ($scope, warehouseService, constants) {
    $scope.imageList    = constants.images.main;
    $scope.social       = {};
    $scope.initializing = true;

    warehouseService
        .getSocialFeeds()
        .then   (function (social) { $scope.social       = social; })
        .finally(function ()       { $scope.initializing = false;  });
});