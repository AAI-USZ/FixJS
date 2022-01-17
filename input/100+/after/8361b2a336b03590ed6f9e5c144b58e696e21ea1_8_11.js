function () {
	var finish;
	var valueOf;
	var Cloud;
	this.init = function (testUtils) {
		finish = testUtils.finish;
		valueOf = testUtils.valueOf;
		Cloud = require('ti.cloud');
	};

	this.name = "cloud files";

	function deleteAllFilesForUser(testRun, userId, password) {
		var ids = [];

		var loggedOut = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			finish(testRun);
		};

		var deleteFile = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			if (ids.length == 0) {
				Cloud.Users.logout(loggedOut);
			} else {
				Cloud.Files.remove({
					file_id:ids.pop()
				}, deleteFile);
			}
		};

		var queryResult = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			for (var i = 0; i < e.files.length; i++) {
				ids.push(e.files[i].id);
			}
			deleteFile(e);
		};

		var loggedIn = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			Cloud.Files.query(queryResult);
		};

		Cloud.Users.login({
			login:userId,
			password:password
		}, loggedIn);
	}

	// ---------------------------------------------------------------
	// Cloud.Files
	// ---------------------------------------------------------------

	var fileId;
	var fileCount = 0;

	// Test that all of the namespace APIs are available
	this.testApi = function (testRun) {
		// Verify that all of the methods are exposed
		valueOf(testRun, Cloud.Files.create).shouldBeFunction();
		valueOf(testRun, Cloud.Files.query).shouldBeFunction();
		valueOf(testRun, Cloud.Files.show).shouldBeFunction();
		valueOf(testRun, Cloud.Files.update).shouldBeFunction();
		valueOf(testRun, Cloud.Files.remove).shouldBeFunction();
		finish(testRun);
	};

	this.testCreate1 = function (testRun) {
		var loggedOut = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			finish(testRun);
		};

		var fileCreated = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.files.length).shouldBe(1);
			valueOf(testRun, e.files[0].name).shouldBe('File #1');
			fileId = e.files[0].id;
			fileCount++;
			Cloud.Users.logout(loggedOut);
		};

		var loggedIn = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			Cloud.Files.create({
				name:'File #1',
				file:Titanium.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'file1.dat'),
				custom_fields:{
					field1:"1",
					field2:"2"
				}
			}, fileCreated)
		};

		Cloud.Users.login({
			login:'drillbituser',
			password:'password'
		}, loggedIn);
	};
	// NOTE: TIMOB-9806 prevents this test from running on MobileWeb
	this.testCreate1.platforms = { android:1, iphone:1, ipad:1, mobileweb:0 };

	this.testCreate2 = function (testRun) {
		var loggedOut = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			finish(testRun);
		};

		var fileCreated = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.files.length).shouldBe(1);
			valueOf(testRun, e.files[0].name).shouldBe('File #2');
			fileCount++;
			Cloud.Users.logout(loggedOut);
		};

		var loggedIn = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			Cloud.Files.create({
				name:'File #2',
				file:Titanium.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'file2.txt')
			}, fileCreated)
		};

		Cloud.Users.login({
			login:'drillbituser',
			password:'password'
		}, loggedIn);
	};
	// NOTE: TIMOB-9806 prevents this test from running on MobileWeb
	this.testCreate2.platforms = { android:1, iphone:1, ipad:1, mobileweb:0 };

	this.testQueryFileNoData = function (testRun) {
		var loggedOut = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			finish(testRun);
		};

		var queryResult = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.files.length).shouldBe(fileCount);
			Cloud.Users.logout(loggedOut);
		};

		var loggedIn = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			Cloud.Files.query(queryResult);
		};

		Cloud.Users.login({
			login:'drillbituser',
			password:'password'
		}, loggedIn);
	};

	this.testQueryFileWhere = function (testRun) {
		var loggedOut = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			finish(testRun);
		};

		var queryResult = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.files.length).shouldBe(1);
			valueOf(testRun, e.files[0].name).shouldBe('File #1');
			Cloud.Users.logout(loggedOut);
		};

		var loggedIn = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			Cloud.Files.query({
				where:{ name:'File #1' }
			}, queryResult);
		};

		Cloud.Users.login({
			login:'drillbituser',
			password:'password'
		}, loggedIn);
	};
	// NOTE: TIMOB-9806 prevents this test from running on MobileWeb
	this.testQueryFileWhere.platforms = { android:1, iphone:1, ipad:1, mobileweb:0 };

	this.testShowFile = function (testRun) {
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
	};
	// NOTE: TIMOB-9806 prevents this test from running on MobileWeb
	this.testShowFile.platforms = { android:1, iphone:1, ipad:1, mobileweb:0 };

	this.testUpdate = function (testRun) {
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
	};
	// NOTE: TIMOB-9806 prevents this test from running on MobileWeb
	this.testUpdate.platforms = { android:1, iphone:1, ipad:1, mobileweb:0 };

	this.testDeleteAllFilesForDrillbitUser = function (testRun) {
		deleteAllFilesForUser(testRun, 'drillbituser', 'password');
	};

	// Populate the array of tests based on the 'hammer' convention
	this.tests = require('hammer').populateTests(this, 30000);
}