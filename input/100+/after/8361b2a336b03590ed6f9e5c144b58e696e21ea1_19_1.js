function () {
	var finish;
	var valueOf;
	var Cloud;
	this.init = function (testUtils) {
		finish = testUtils.finish;
		valueOf = testUtils.valueOf;
		Cloud = require('ti.cloud');
	};

	this.name = "cloud social interactions";

	function verifyAPIs(testRun, namespace, functions) {
		for (var i = 0; i < functions.length; i++) {
			valueOf(testRun, Cloud[namespace][functions[i]]).shouldBeFunction();
		}
	}

	// ---------------------------------------------------------------
	// Cloud.SocialIntegrations
	// ---------------------------------------------------------------

	// Test that all of the namespace APIs are available
	this.testApi = function (testRun) {
		// Verify that all of the methods are exposed
		verifyAPIs(testRun, 'SocialIntegrations', [
			'externalAccountLogin',
			'externalAccountLink',
			'externalAccountUnlink',
			'searchFacebookFriends'
		]);
		finish(testRun);
	};

	// NOTE: Further testing of Cloud.SocialIntegrations requires manual testing
	// as it relies on the creation of an external social network account

	// Populate the array of tests based on the 'hammer' convention
	this.tests = require('hammer').populateTests(this, 30000);
}