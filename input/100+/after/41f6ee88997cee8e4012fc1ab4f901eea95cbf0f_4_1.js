function ViewModel() {
	var self = this;

	self.isLoggedIn = ko.observable(false);
	self.user = ko.observable({});

    /* Globals */
	self.alerts = ko.observableArray([]).extend({ defaultItem: { title: "", text: "", type: "info" } });

	/* Components */
	self.registerPanel = ko.observable(new RegisterPanel());
	self.loginPanel = ko.observable(new LoginPanel());
	self.userEmailPanel = ko.observable(new UserEmailPanel());

	/* Methods */
	self.LogOut = function () {
		Application.isLoggedIn(false);
		Application.user({});
		$.cookie('userId', null);
		$.cookie('sessionKey', null);

		return false;
	};

	self.UpdateUserInfo = function (userId, sessionKey) {
		if (typeof userId === "undefined" || typeof sessionKey === "undefined") {
			if (!self.isLoggedIn()) {
				return;
			}

			userId = self.user().Id();
			sessionKey = self.user().SessionKey.Key();
		}

		amplify.request({
			resourceId: "userInfo",
			data: {
				userId: userId,
				sessionKey: sessionKey
			},
			success: function (data) {
				Application.isLoggedIn(true);
				Application.user(ko.mapping.fromJS(data));
			}
		});
	};
}