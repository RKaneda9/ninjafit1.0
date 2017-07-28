app.controller('aboutUs', function ($scope, $sce, $state, warehouseService, utils, constants) {

    $scope.initializing = false;
    $scope.staff = utils.map(constants.staff, function (member) {
        return {
            image: member.image,
            name : member.name,
            title: member.title,
            bio  : $sce.trustAsHtml('<p>' + (member.bio.split('\n').join('</p><p>')) + '</p>')
        };
    });

    if ($state.current.name == 'about-us.staff') {
        setTimeout(function () {
            document.getElementById('staff').focus();
        }, 100);
    }
});