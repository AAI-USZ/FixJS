function(e) {
			valueOf(testRun, e.success).shouldBeTrue();
			Cloud.Users.login({
				login: 'chatuser',
				password: 'password'
			}, login2);
		}