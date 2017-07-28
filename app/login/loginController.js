app.controller('login', function ($scope, $rootScope, warehouseService, constants, utils, enums, loginModel, responseMsg) {

    var errMsgs = {
        _default    : 'Oops there was a problem attempting to login. Please try again.',
        lockedOut   : 'Oops, too many invalid requests. Ninja is locked out for 1 hour.',
        invalidCreds: 'Username or Password is not correct, or Ninja is inactive.'
    };

    $scope.imageList = constants.images.main;
    $scope.model     = new loginModel ();
    $scope.msg       = new responseMsg();
    $scope.posting   = false;

    $scope.keydown = function (event) { if (event.which == 13) { $scope.login(); } };

    $scope.register       = function () { location = constants.registerUrl; };
    $scope.forgotPassword = function () { $rootScope.goTo('forgotPassword'); };

    $scope.login = function () {

        $scope.msg.clear();

        if ($scope.posting || !$scope.model.isValid()) { return; }

        $scope.posting = true;

        warehouseService
            .tryLogin($scope.model.get())
            .then(function (response) {

                if (response && response.data && response.data.result) {

                    switch (response.data.result) {
                        case enums.loginResult.invalidCreds: return $scope.msg.setInvalid(errMsgs.invalidCreds), $scope.posting = false;
                        case enums.loginResult.lockedOut   : return $scope.msg.setInvalid(errMsgs.lockedOut),    $scope.posting = false;
                        case enums.loginResult.validCreds  : return $scope.model.clear();
                    }
                }

                $scope.msg.setInvalid(errMsgs._default);
                $scope.posting = false;
            })
            .catch(function () { $scope.msg.setInvalid(errMsgs._default); $scope.posting = false; });

    };

    var params = utils.getQueryObj();

    if (params.creds == 'invalid') {
        $scope.model.errMsg = params.lockedout ? errMsgs.lockedOut : errMsgs.invalidCreds;
    }
});