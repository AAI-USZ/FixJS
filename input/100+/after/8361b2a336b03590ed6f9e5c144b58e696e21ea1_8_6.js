function (testRun) {
		var loggedOut = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			finish(testRun);
		};

		var showResult = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.files.length).shouldBe(1);
			valueOf(testRun, e.files[0].name).shouldBe('File #1');
			valueOf(testRun, e.files[0].custom_fields.field1).shouldBe("1");
			valueOf(testRun, e.files[0].custom_fields.field2).shouldBe("2");
			Cloud.Users.logout(loggedOut);
		};

		var loggedIn = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			Cloud.Files.show({
				file_id:fileId
			}, showResult);
		};

		Cloud.Users.login({
			login:'drillbituser',
			password:'password'
		}, loggedIn);
	}