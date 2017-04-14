app.directive('facebookFeed', function () {
	return {
		restrict   : 'E',
		replace    : true,
		templateUrl: 'app/news/facebookDirective.html',
		scope      : { feed: '=feed' }
	};
});