function() {
		var user = Echo.UserSession({"appkey": "test.aboutecho.com"});

		QUnit.ok(!user.is("logged"),
			"Check if the user is not logged in using user.is(\"logged\") function");
		QUnit.equal(user.is("logged"), user._isLogged(),
			"Check \"is\" function delegation using \"logged\" property");

		var avatar = user.get("avatar");
		var defaultAvatar = "http://example.com/default-avatar.png";
		QUnit.equal(user.get("avatar", defaultAvatar), defaultAvatar,
			"Checking get operation with existing attribute and default value via function call delegation (avatar field)");

		this.checkBasicOperations();

		QUnit.start();
	}