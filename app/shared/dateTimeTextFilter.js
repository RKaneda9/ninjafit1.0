app.filter('dateTimeText', function () {
	return function (dateTimeKey, isUtc, format) {
		var date  = isUtc ? Date.fromUTCDateTimeKey(dateTimeKey, "N/A") : Date.fromDateTimeKey(dateTimeKey, "N/A");
		var today = new Date();

		if (format) { return date.format(format); }

		if (date.getDateKey() == today.getDateKey()) {
			return "Today, " + date.format('h:mm tt');
		}
		else if (date.getDateKey() == today.addDays(-1).getDateKey()) {
			return "Yesterday, " + date.format('h:mm tt');
		}
		else {
			return date.format("M* D*, h:mm tt");
		}
	};
});