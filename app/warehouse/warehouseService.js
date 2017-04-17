app.service('warehouseService', function ($http, $q, $timeout, notificationsService, enums, constants) {

	var wods,
		social,
		schedule = {},
		self     = this;

	self.getWods = function () {

		if (wods) { return resolve(wods); }

		var url = constants.apiUrl + "workouts/wod";
		
		return $http
			.get(url)
			.error(function ()         { notificationsService.addError("There was a problem trying to retrieve today's WOD."); })
			.then (function (response) { if (response && response.data) { return (wods = response.data); } });
	};

	self.getSchedule = function (start) {

		if (start && schedule[start]) { return resolve(schedule[start]); }

		var url = constants.apiUrl + "schedule/calendar/week?datekey=" + (start || '');
		
		return $http
			.get(url)
			.error(function ()         { notificationsService.addError("There was a problem trying to the schedule for the selected week."); })
			.then (function (response) { if (response && response.data) { return (schedule[start] = response.data); } });
	};

	self.getSocialFeeds = function () {

		if (social) { return resolve(social); }

		var url = constants.apiUrl + "social";

		return $http
			.get(url)
			.error(function () { notificationsService.addError("There was a problem retrieving social media feeds."); })
			.then (function (response) { if (response && response.data) { return (social = response.data); } });
	};

	self.sendMessage = function (msg) {
		var url = constants.apiUrl + 'message';
		return $http.post(url, msg)
			.success(function (response) { 

				if (response.isValid) { notificationsService.addSuccess('Message sent successfully!'); }
				else                  { notificationsService.addError(response.message || 'There was a problem trying to send your message. Please try again.'); }
			})
			.error(function () { notificationsService.addError('There was a problem trying to send your message. Please try again.'); });
	};

	self.tryLogin = function (creds) {
		var url = constants.apiUrl + 'login/attempt';

		var params = {
			userName: creds.userName,
			password: creds.password
		};

		return $http.post(url, params)
			.success(function (response) { 
				if (response && response.result == enums.loginResult.validCreds) { return self.login(creds, response.redirectLink); }
			});
	};

	self.login = function (creds, url) {

		var form = document.createElement('form');
		form.setAttribute('class',  'hidden');
		form.setAttribute('method', 'post');
		form.setAttribute('action', url);

		var userName = document.createElement('input');
		userName.setAttribute('type', 'text');
		userName.setAttribute('name', 'membername');
		userName.value = creds.userName;

		var password = document.createElement('input');
		password.setAttribute('type', 'password');
		password.setAttribute('name', 'password');
		password.value = creds.password;

		var page = document.createElement('input');
		page.setAttribute('type', 'text');
		page.setAttribute('name', 'page');
		page.value = 'login';

		form.appendChild(userName);
		form.appendChild(password);
		form.appendChild(page);

		document.body.appendChild(form);

		if (form.submit) { return form.submit(); }

		var button = document.createElement('button');
		button.setAttribute('type', 'submit');

		form.appendChild(button);
		button.submit();
	};

	// params: { userName: userName };
	self.forgotPassword = function (params) {

		var url = constants.apiUrl + 'forgot';

		return $http.post(url, params)
			.success(function (response) {
				if (response.result == enums.forgotPasswordResult.valid) {
					notificationsService.addSuccess('Please check your email for further instructions.');
				}
			});
	};

	function resolve(obj) {
		var deferred = $q.defer();
		
		$timeout(function () { deferred.resolve(obj); });

		return deferred.promise;
	}
});