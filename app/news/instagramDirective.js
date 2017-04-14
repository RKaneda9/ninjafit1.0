app.directive('instagramFeed', function () {
	return {
		restrict   : 'E',
		replace    : true,
		templateUrl: 'app/news/instagramDirective.html',
		scope      : { feed: '=feed' }
	};
});