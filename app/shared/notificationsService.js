app.factory('notificationModel', function (utils) {
	return function (params) {

		if (!params) { params = {}; }

		var self = this;
		self.id        = utils.generateId();
		self.duration  = params.duration || 3000;
		self.msg       = params.msg;
		self.style     = utils.getStylesStr(params.style);

		switch (params.type) {
			case 'success': self.title = 'Success!'; self.class = "alert success"; break;
			case 'warning': self.title = 'Warning!'; self.class = "alert warning"; break;
			case 'info'   : self.title = 'Info!';    self.class = "alert info";    break;
			default:        self.title = 'Oops...';  self.class = "alert danger";  break;
		}
	};
});

app.service('notificationsService', function ($timeout, utils, notificationModel) {

	var self = this;

	self.notifications = [];

	self.add = function (params) {

		var item = new notificationModel(params);

		self.notifications.push(item);

		$timeout(function () { self.remove(item.id); }, item.duration);
	};

	self.addError   = function (msg, duration) { self.add({ msg: msg, duration: duration, type: 'error'   }); };
	self.addSuccess = function (msg, duration) { self.add({ msg: msg, duration: duration, type: 'success' }); };
	self.addInfo    = function (msg, duration) { self.add({ msg: msg, duration: duration, type: 'info'    }); };
	self.addWarning = function (msg, duration) { self.add({ msg: msg, duration: duration, type: 'warning' }); };

	self.remove = function (id) {

		var index = 
			utils.foreach(self.notifications, function (notification) {
				if (notification.id == id) { return false; }
			});

		if (index > -1) { self.notifications.splice(index, 1); }
	};
});