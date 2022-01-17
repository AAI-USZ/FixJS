function (testRun) {
		var carIds = [];
		var carsQueried = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.error).shouldBeFalse();
			for (var i = 0; i < e.cars.length; i++) {
				carIds.push(e.cars[i].id);
			}
			Cloud.Objects.remove({ classname:'cars', ids:carIds.toString() }, carsRemoved);
		};

		var carsRemoved = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.error).shouldBeFalse();
			Cloud.Objects.query({ classname:'cars' }, finished);
		};

		var finished = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.error).shouldBeFalse();
			valueOf(testRun, e.cars.length).shouldBe(0);
			valueOf(testRun, e.meta.total_results).shouldBe(0);
			finish(testRun);
		};

		Cloud.Objects.query({ classname:'cars' }, carsQueried);
	}