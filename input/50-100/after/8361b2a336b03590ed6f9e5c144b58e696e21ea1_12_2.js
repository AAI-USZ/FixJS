function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.error).shouldBeFalse();
			valueOf(testRun, e.test.length).shouldBe(0);
			valueOf(testRun, e.meta.total_results).shouldBe(0);
			finish(testRun);
		}