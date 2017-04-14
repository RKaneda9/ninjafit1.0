app.factory('forgotPasswordModel', function (validationModel) {

	function ForgotPasswordModel () {
		this.props.userName = { value: '', invalid: false };

		this.isValid = function () {

			var props = this.trim();

			if (!props.userName || !props.userName.length) { return this.setInvalid(this.props.userName, 'Please enter a Username to retreive password.'); } 
				
			return this.clearValidation();

		}.bind(this);
	}

	ForgotPasswordModel.prototype = validationModel.prototype;

	return ForgotPasswordModel;
});