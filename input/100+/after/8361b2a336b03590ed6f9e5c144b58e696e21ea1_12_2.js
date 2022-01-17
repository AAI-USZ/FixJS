function (testRun) {
		var data = {
			classname:'test',
			limit:10,
			skip:0,
			order:'name',
			where:{
				name:{ '$regex':'test' },
				name:{ '$ne':'test0' }
			}
		};
		Cloud.Objects.query(data, function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.error).shouldBeFalse();
			valueOf(testRun, e.test.length).shouldBe(4);
			valueOf(testRun, e.test[0].name).shouldBe('test1');
			valueOf(testRun, e.test[1].name).shouldBe('test2');
			valueOf(testRun, e.test[2].name).shouldBe('test3');
			valueOf(testRun, e.test[3].name).shouldBe('test4');
			finish(testRun);
		});
	}