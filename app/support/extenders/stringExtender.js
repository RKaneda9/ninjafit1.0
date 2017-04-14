(function () {

	if (String.prototype.includes === undefined) {
		String.prototype.includes = function (find) {
			return this.indexOf(find) > -1;
		};
	}
}());