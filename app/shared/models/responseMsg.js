app.factory('responseMsg', function () {
	function ResponseMsg() { this.clear(); }

	ResponseMsg.prototype = {
		clear: function () {
			this.isError = false;
			this.text    = '';
		},
		setInvalid: function (text) {
			this.isError = true;
			this.text    = text;
		},
		setValid: function (text) {
			this.isError = false;
			this.text    = text || '';
		}
	};

	return ResponseMsg;
});