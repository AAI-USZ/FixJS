function (testRun) {
		var loggedOut2 = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			finish(testRun);
		};

		var created2 = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.error).shouldBeFalse();
			Cloud.Users.logout(loggedOut2);
		};

		var login2 = function (e) {
			if (e.success == false) {
				var data = {
					username:'chatuser',
					password:'password',
					password_confirmation:'password'
				};
				Cloud.Users.create(data, created1);
			} else {
				created2(e);
			}
		};

		var loggedOut1 = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			Cloud.Users.login({
				login:'chatuser',
				password:'password'
			}, login2);
		};

		var created1 = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.error).shouldBeFalse();
			Cloud.Users.logout(loggedOut1);
		};

		var login1 = function (e) {
			if (e.success == false) {
				var data = {
					username:'drillbituser',
					password:'password',
					password_confirmation:'password'
				};
				Cloud.Users.create(data, created1);
			} else {
				created1(e);
			}
		};

		Cloud.Users.login({
			login:'drillbituser',
			password:'password'
		}, login1);
	}