function () {
	var finish;
	var valueOf;
	var Cloud;
	this.init = function (testUtils) {
		finish = testUtils.finish;
		valueOf = testUtils.valueOf;
		Cloud = require('ti.cloud');
	};

	this.name = "cloud";

	// ---------------------------------------------------------------
	// Cloud
	// ---------------------------------------------------------------

	// Test that cloud module is part of TiSDK
	this.testModule = function (testRun) {
		// Verify that the module is defined
		valueOf(testRun, Cloud).shouldBeObject();
		finish(testRun);
	};

	// Test the usage of the useSecure property
	this.testUseSecure = function (testRun) {
		// Verify default value of useSecure
		valueOf(testRun, Cloud.useSecure).shouldBeUndefined();
		// Verify useSecure property changes
		Cloud.useSecure = false;
		valueOf(testRun, Cloud.useSecure).shouldBeFalse();
		// Verify useSecure resets
		Cloud.useSecure = true;
		valueOf(testRun, Cloud.useSecure).shouldBeTrue();
		finish(testRun);
	};

	this.testEnsureSetup = function (testRun) {
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
	};

	// Populate the array of tests based on the 'hammer' convention
	this.tests = require('hammer').populateTests(this, 30000);
}