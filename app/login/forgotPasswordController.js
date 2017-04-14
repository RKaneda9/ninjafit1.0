app.controller('forgotPassword', function ($scope, $rootScope, warehouseService, constants, utils, enums, forgotPasswordModel, responseMsg) {

	var errMsgs = {
		_default: 'Unrecognized response returned trying to reset password. Please try again.',
		invalid: 'No email or active profile found matching that Username.',
		empty: 'Please enter a Username to retrieve password.'
	};

	$scope.imageList = constants.images.main;
	$scope.model     = new forgotPasswordModel();
	$scope.msg       = new responseMsg();
	$scope.sending   = false;

	$scope.keydown = function (event) { if (event.which == 13) { $scope.send(); } };

	$scope.register  = function () { location = constants.registerUrl; };
	$scope.goToLogin = function () { $rootScope.goTo('login');    };

	$scope.send = function () {

		$scope.msg.clear();

		if ($scope.sending || !$scope.model.isValid()) { return; }

		$scope.sending = true;
		
		warehouseService
			.forgotPassword($scope.model.get())
			.then(function (response) {

				if (response && response.data && response.data.result) {

					var result       = response.data.result;
					var redirectLink = response.data.redirectLink;

					switch (result) {
						case enums.forgotPasswordResult.invalid: return $scope.msg.setInvalid(errMsgs.invalid);
						case enums.forgotPasswordResult.empty  : return $scope.msg.setInvalid(errMsgs.empty);  
						case enums.forgotPasswordResult.valid  : return $scope.model.clear();              

						case enums.forgotPasswordResult.unknown: 

							if (redirectLink) { location = redirectLink; }
							break;
					}
				}

				$scope.msg.setInvalid(errMsgs._default);
			})
			.catch  (function () { $scope.msg.setInvalid(errMsgs._default); })
			.finally(function () { $scope.sending = false; });

	};
});