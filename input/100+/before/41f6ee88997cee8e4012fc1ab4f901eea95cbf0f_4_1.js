function ViewModel() {
	var self = this;

	self.isLoggedIn = ko.observable(false);
	self.user = ko.observable({});

    /* Globals */
	self.alerts = ko.observableArray([]).extend({ defaultItem: { title: "", text: "", type: "info" } });

	/* Components */
	self.registerPanel = ko.observable(new RegisterPanel());
	self.loginPanel = ko.observable(new LoginPanel());

	/* Methods */
	self.LogOut = function () {
		Application.isLoggedIn(false);
		Application.user({});
		$.cookie('userdata', null);

		return false;
	};
}