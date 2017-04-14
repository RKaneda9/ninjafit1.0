app.filter('hashTagLinks', function ($sce) {
	return function (content, hashTags, hashTagLink) {

		if (!hashTags || !(hashTags instanceof Array) || !content || !hashTagLink) { return; }

		var link = '<a target="hashtag" href="' + hashTagLink + '{{hashTag}}">&#35;{{hashTag}}</a>';

		(hashTags || []).forEach(function (hashTag) {
			content = content.replace('#' + hashTag, link.split('{{hashTag}}').join(hashTag));
		});

		return $sce.trustAsHtml(content);
	};
});