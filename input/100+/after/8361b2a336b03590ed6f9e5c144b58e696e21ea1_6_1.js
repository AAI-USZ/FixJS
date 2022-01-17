function () {
	var finish;
	var valueOf;
	var Cloud;
	this.init = function (testUtils) {
		finish = testUtils.finish;
		valueOf = testUtils.valueOf;
		Cloud = require('ti.cloud');
	};
	this.name = "cloud emails";

	function verifyAPIs(testRun, namespace, functions) {
		for (var i = 0; i < functions.length; i++) {
			valueOf(testRun, Cloud[namespace][functions[i]]).shouldBeFunction();
		}
	}

	// ---------------------------------------------------------------
	// Cloud.Emails
	// ---------------------------------------------------------------

	// Test that all of the namespace APIs are available
	this.testApi = function (testRun) {
		// Verify that all of the methods are exposed
		verifyAPIs(testRun, 'Emails', [
			'send'
		]);
		finish(testRun);
	};

	this.testSend = function (testRun) {
		var data = {
			template:'DrillbitTest',
			name:'John Smith',
			subject:'cloudEmailsSend Drillbit test',
			recipients:'joe@smith.com',
			from:'test@appcelerator.com'
		};
		Cloud.Emails.send(data, function (e) {
			valueOf(testRun, e.success).shouldBeFalse();
			valueOf(testRun, e.error).shouldBeTrue();
			valueOf(testRun, e.code).shouldBe(422);
			finish(testRun);
		});
	};

	// Populate the array of tests based on the 'hammer' convention
	this.tests = require('hammer').populateTests(this, 30000);
}