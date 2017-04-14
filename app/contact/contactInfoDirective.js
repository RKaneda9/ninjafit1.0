app.directive('contactInfo', function (constants) {

	return {
		restrict   : 'E',
		replace    : true,
		templateUrl: 'app/contact/contactInfoDirective.html',
		scope      : { addressMap: '=addressMap' },

		link: function (scope, elem, attrs) {

			var data = constants.contact || {};

			scope.phone   = data.phone;
			scope.email   = data.email;
			scope.address = data.address;
			scope.social  = Object.keys(data.social).map(function (key) {
				return { type: key, url: data.social[key] };
			});
		}
	};
});