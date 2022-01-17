function () {
	var finish;
	var valueOf;
	var Cloud;
	this.init = function (testUtils) {
		finish = testUtils.finish;
		valueOf = testUtils.valueOf;
		Cloud = require('ti.cloud');
	};

	this.name = "cloud objects";

	function verifyAPIs(testRun, namespace, functions) {
		for (var i = 0; i < functions.length; i++) {
			valueOf(testRun, Cloud[namespace][functions[i]]).shouldBeFunction();
		}
	}

	var Objects = { ids:[] };
	var drillbitUserId;

	// 1. The following tests assume the existence of the application on api.cloud.appcelerator.com.
	// 2. The following users must exist in the application:
	//    username: 'drillbituser'
	//    password: 'password'
	//    username: 'chatuser'
	//    password: 'password'
	// 3. There should not be any other users defined in the application

	// ---------------------------------------------------------------
	// Cloud.Objects
	// ---------------------------------------------------------------

	// Test that all of the namespace APIs are available
	this.testApi = function (testRun) {
		// Verify that all of the methods are exposed
		verifyAPIs(testRun, 'Objects', [
			'create',
			'show',
			'update',
			'remove',
			'query'
		]);
		finish(testRun);
	};

	// Test that an object cannot be created when not logged in
	this.testCreateObjectNotLoggedIn = function (testRun) {
		var data = {
			classname:'cars',
			make:'mini',
			model:'cooper',
			color:'blue',
			year:2012
		};
		Cloud.Objects.create(data, function (e) {
			valueOf(testRun, e.success).shouldBeFalse();
			valueOf(testRun, e.error).shouldBeTrue();
			finish(testRun);
		});
	};

	// Log in for the following tests
	this.testLoginDrillbitUser = function (testRun) {
		var data = {
			login:'drillbitUser',
			password:'password'
		};
		Cloud.Users.login(data, function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.error).shouldBeFalse();
			drillbitUserId = e.users[0].id;
			finish(testRun);
		});
	};

	// Cloud.Objects.create
	// Test that an object can be created when logged in
	this.testCreateObjectLoggedIn = function (testRun) {
		var data = {
			classname:'cars',
			fields:{
				make:'mini',
				model:'cooper',
				color:'blue',
				year:2012,
				drivers:[ 'joe', 'sue', 'johnny', 'alex' ],
				options:{
					leather:true,
					heatedseats:false,
					package:'premium'
				}
			}
		};
		Cloud.Objects.create(data, function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.error).shouldBeFalse();
			// Save off the id for later test
			Objects.ids.push(e.cars[0].id);
			finish(testRun);
		});
	};

	// Test the creation of multiple objects in one pass
	this.testCreateMultipleObjects = function (testRun) {
		var count = 0;
		var cb = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			if (++count == 5) {
				finish(testRun);
			}
		};
		for (var i = 0; i < 5; i++) {
			Cloud.Objects.create({ classname:'test', fields:{ name:'test' + i } }, cb);
		}
	};

	// Cloud.Objects.show
	this.testShowObject = function (testRun) {
		var data = {
			classname:'cars',
			id:Objects.ids[0]
		};

		Cloud.Objects.show(data, function (e) {
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
		});
	};

	// Cloud.Objects.update
	this.testUpdateObject = function (testRun) {
		var data = {
			classname:'cars',
			id:Objects.ids[0],
			fields:{
				// add a field
				mileage:10000,
				// update a field
				options:{
					leather:false,
					heatedseats:true,
					package:'sport',
					// add a sub-field
					sunroof:true
				},
				// remove a field
				drivers:null
			}
		};
		Cloud.Objects.update(data, function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.error).shouldBeFalse();
			valueOf(testRun, e.cars.length).shouldBe(1);
			valueOf(testRun, e.cars[0].id).shouldBe(Objects.ids[0]);
			valueOf(testRun, e.cars[0].make).shouldBe('mini');
			valueOf(testRun, e.cars[0].model).shouldBe('cooper');
			valueOf(testRun, e.cars[0].color).shouldBe('blue');
			valueOf(testRun, e.cars[0].year).shouldBe(2012);
			valueOf(testRun, e.cars[0].drivers).shouldBeUndefined();
			valueOf(testRun, e.cars[0].options).shouldBeObject();
			valueOf(testRun, e.cars[0].options.leather).shouldBeFalse();
			valueOf(testRun, e.cars[0].options.heatedseats).shouldBeTrue();
			valueOf(testRun, e.cars[0].options.package).shouldBe('sport');
			valueOf(testRun, e.cars[0].options.sunroof).shouldBeTrue();
			valueOf(testRun, e.cars[0].mileage).shouldBe(10000);
			finish(testRun);
		});
	};

	// Cloud.Objects.query
	this.testQueryOneObject = function (testRun) {
		var data = {
			classname:'cars',
			limit:1,
			skip:0,
			where:{
				user_id:drillbitUserId,
				mileage:{ '$gt':5000, '$lt':15000 },
				color:'blue'
			}
		};
		Cloud.Objects.query(data, function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.error).shouldBeFalse();
			valueOf(testRun, e.cars.length).shouldBe(1);
			valueOf(testRun, e.cars[0].id).shouldBe(Objects.ids[0]);
			finish(testRun);
		});
	};

	this.testQueryMultipleObjects = function (testRun) {
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
	};

	// Cloud.Objects.remove
	this.testDeleteAllCars = function (testRun) {
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
	};

	this.testDeleteAllTests = function (testRun) {
		var testIds = [];
		var testsQueried = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.error).shouldBeFalse();
			for (var i = 0; i < e.test.length; i++) {
				testIds.push(e.test[i].id);
			}
			Cloud.Objects.remove({ classname:'test', ids:testIds.toString() }, testsRemoved);
		};

		var testsRemoved = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.error).shouldBeFalse();
			Cloud.Objects.query({ classname:'test' }, finished);
		};

		var finished = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.error).shouldBeFalse();
			valueOf(testRun, e.test.length).shouldBe(0);
			valueOf(testRun, e.meta.total_results).shouldBe(0);
			finish(testRun);
		};

		Cloud.Objects.query({ classname:'test', limit:100 }, testsQueried);
	};

	// Done with the tests -- log out
	this.testLogoutDrillbitUser = function (testRun) {
		Cloud.Users.logout(function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.error).shouldBeFalse();
			finish(testRun);
		});
	};

	// Populate the array of tests based on the 'hammer' convention
	this.tests = require('hammer').populateTests(this, 30000);
}