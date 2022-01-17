function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.error).shouldBeFalse();
			valueOf(testRun, e.cars.length).shouldBe(1);
			valueOf(testRun, e.cars[0].id).shouldBe(Objects.ids[0]);
			valueOf(testRun, e.cars[0].make).shouldBe('mini');
			valueOf(testRun, e.cars[0].model).shouldBe('cooper');
			valueOf(testRun, e.cars[0].color).shouldBe('blue');
			valueOf(testRun, e.cars[0].year).shouldBe(2012);
			valueOf(testRun, e.cars[0].drivers.length).shouldBe(4);
			valueOf(testRun, e.cars[0].options).shouldBeObject();
			valueOf(testRun, e.cars[0].options.leather).shouldBeTrue();
			valueOf(testRun, e.cars[0].options.heatedseats).shouldBeFalse();
			valueOf(testRun, e.cars[0].options.package).shouldBe('premium');
			finish(testRun);
		}