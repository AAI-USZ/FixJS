function (testRun) {
		var loggedOut = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			finish(testRun);
		};

		var showResult = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.files.length).shouldBe(1);
			valueOf(testRun, e.files[0].name).shouldBe('File #99');
			valueOf(testRun, e.files[0].custom_fields.field1).shouldBe("1");
			valueOf(testRun, e.files[0].custom_fields.field2).shouldBe("2");
			Cloud.Users.logout(loggedOut);
		};

		var fileUpdated = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.files.length).shouldBe(1);
			valueOf(testRun, e.files[0].name).shouldBe('File #99');
			valueOf(testRun, e.files[0].custom_fields.field1).shouldBe("1");
			valueOf(testRun, e.files[0].custom_fields.field2).shouldBe("2");
			Cloud.Files.show({
				file_id:fileId
			}, showResult);
		};

		var loggedIn = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			Cloud.Files.update({
				file_id:fileId,
				name:'File #99'
			}, fileUpdated)
		};

		Cloud.Users.login({
			login:'drillbituser',
			password:'password'
		}, loggedIn);
	}