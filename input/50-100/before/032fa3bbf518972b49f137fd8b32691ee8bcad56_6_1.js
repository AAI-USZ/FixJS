function() {
		var user = Echo.UserSession({"appkey": "test.aboutecho.com"});

		QUnit.ok(!user.is("logged"),
			"Check if the user is not logged in using user.is(\"logged\") function");
		QUnit.equal(user.is("logged"), user._isLogged(),
			"Check \"is\" function delegation using \"logged\" property");

		this.checkBasicOperations();

		QUnit.start();
	}