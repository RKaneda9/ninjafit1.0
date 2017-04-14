app.directive('sendMessage', function (warehouseService, notificationsService, sendMessageModel) {

	return {
		restrict   : 'E',
		replace    : true,
		templateUrl: 'app/contact/sendMessageDirective.html',

		link: function (scope, elem, attrs) {

			scope.msg     = new sendMessageModel();
			scope.sending = false;

			scope.send = function () {

				if (scope.sending || !scope.msg.isValid()) { return; }

				var msg = scope.msg.get();

				scope.sending = true;

				warehouseService
					.sendMessage(msg)
					.then   (function (response) { if (response && response.data && response.data.isValid) { scope.msg.clear(); } })
					.finally(function ()         { scope.sending = false; });
			};
		}
	};
});