app.directive('icon', function () {

	return {
		restrict   : 'E',
		replace    : true,
		templateUrl: function (elem, attr) {
			return 'app/shared/icons/' + (attr.type) + '.html';
		}
	};
});