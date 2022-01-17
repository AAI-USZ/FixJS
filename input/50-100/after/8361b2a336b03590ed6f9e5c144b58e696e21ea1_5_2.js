function (testRun) {
		var data = {
			ip_address:'184.72.37.109'
		};
		Cloud.Clients.geolocate(data, function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.error).shouldBeFalse();
			valueOf(testRun, e.ip_address).shouldBe('184.72.37.109');
			valueOf(testRun, e.location.city).shouldBe('San Jose');
			finish(testRun);
		});
	}