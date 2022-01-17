function (testRun) {
		var data = {
			first_name:'joe',
			last_name:'user',
			tags:'golf, snowboarding',
			custom_fields:{
				color:'red',
				number:5
			},
			emptyDictionary: {}
		};

		Cloud.Users.update(data, function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.error).shouldBeFalse();
			valueOf(testRun, e.users[0].tags).shouldContain('golf');
			valueOf(testRun, e.users[0].tags).shouldContain('snowboarding');
			valueOf(testRun, e.users[0].first_name).shouldBe('joe');
			valueOf(testRun, e.users[0].last_name).shouldBe('user');
			valueOf(testRun, e.users[0].custom_fields.color).shouldBe('red');
			valueOf(testRun, e.users[0].custom_fields.number).shouldBe(5);
			finish(testRun);
		});
	}