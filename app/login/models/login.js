app.factory('loginModel', function (validationModel) {

	function LoginModel () {
		this.props.userName = { value: '', invalid: false };
		this.props.password = { value: '', invalid: false };

		this.isValid = function () {

			var props = this.trim();

			if (!props.userName.length) { return this.setInvalid(this.props.userName, 'Please enter a Username.'); }
			if (!props.password.length) { return this.setInvalid(this.props.password, 'Please enter a Password.'); }

			return this.clearValidation();

		}.bind(this);
	}

	LoginModel.prototype = validationModel.prototype;

	return LoginModel;
});