function () {
	var finish;
	var valueOf;
	var Cloud;
	this.init = function (testUtils) {
		finish = testUtils.finish;
		valueOf = testUtils.valueOf;
		Cloud = require('ti.cloud');
	};

	this.name = "cloud places";

	function verifyAPIs(testRun, namespace, functions) {
		for (var i = 0; i < functions.length; i++) {
			valueOf(testRun, Cloud[namespace][functions[i]]).shouldBeFunction();
		}
	}

	var drillbitUserId;
	var ids = [];

	// ---------------------------------------------------------------
	// Cloud.Places
	// ---------------------------------------------------------------

	// Test that all of the namespace APIs are available
	this.testApi = function (testRun) {
		// Verify that all of the methods are exposed
		verifyAPIs(testRun, 'Places', [
			'create',
			'search',
			'show',
			'update',
			'remove',
			'query'
		]);
		finish(testRun);
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

	this.testCreate = function (testRun) {
		var data = {
			name:'Appcelerator HQ',
			address:'440 N. Bernardo Avenue',
			city:'Mountain View',
			state:'CA',
			postal_code:'94043',
			country:'USA',
			website:'http://www.appcelerator.com',
			phone_number:'650.200.4255',
			photo:Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'appcelerator.jpg'),
			tags:'appcelerator, hq'
		};
		Cloud.Places.create(data, function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.error).shouldBeFalse();
			valueOf(testRun, e.places.length).shouldBe(1);
			valueOf(testRun, e.places[0].name).shouldBe('Appcelerator HQ');
			valueOf(testRun, e.places[0].photo).shouldBeObject();
			ids.push(e.places[0].id);
			finish(testRun);
		});
	};
	this.testCreate.platforms = { android:1, iphone:1, ipad:1, mobileweb:0 };

	this.testCreateAndSearch = function (testRun) {
		var data = {
			name:'Apple HQ',
			address:'1 Infinite Loop',
			city:'Cupertino',
			state:'CA',
			postal_code:'95014',
			country:'USA',
			website:'http://www.apple.com',
			phone_number:'408-996-1010',
			photo:Titanium.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'apple_logo.jpg'),
			tags:'apple, hq'
		};

		var placeCreated = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.error).shouldBeFalse();
			valueOf(testRun, e.places.length).shouldBe(1);
			valueOf(testRun, e.places[0].name).shouldBe('Apple HQ');
			valueOf(testRun, e.places[0].photo).shouldBeObject();
			ids.push(e.places[0].id);
			Cloud.Places.search(searchResult);
		};

		var searchResult = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.error).shouldBeFalse();
			valueOf(testRun, e.places.length).shouldBe(2);
			finish(testRun);
		};

		Cloud.Places.create(data, placeCreated);
	};
	// NOTE: TIMOB-9806 prevents this test from running on MobileWeb
	this.testCreateAndSearch.platforms = { android:1, iphone:1, ipad:1, mobileweb:0 };

	this.testSearchByKeyword = function (testRun) {
		var data = {
			q:'Appcelerator'
		};
		Cloud.Places.search(data, function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.error).shouldBeFalse();
			valueOf(testRun, e.places.length).shouldBe(1);
			valueOf(testRun, e.places[0].name).shouldBe('Appcelerator HQ');
			finish(testRun);
		});
	};
	// NOTE: TIMOB-9806 prevents this test from running on MobileWeb
	this.testSearchByKeyword.platforms = { android:1, iphone:1, ipad:1, mobileweb:0 };

	this.testShow = function (testRun) {
		var data = {
			place_id:ids[0]
		};
		Cloud.Places.show(data, function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.error).shouldBeFalse();
			valueOf(testRun, e.places.length).shouldBe(1);
			valueOf(testRun, e.places[0].name).shouldBe('Appcelerator HQ');
			valueOf(testRun, e.places[0].id).shouldBe(ids[0]);
			finish(testRun);
		});
	};
	// NOTE: TIMOB-9806 prevents this test from running on MobileWeb
	this.testShow.platforms = { android:1, iphone:1, ipad:1, mobileweb:0 };

	this.testUpdate = function (testRun) {
		var data = {
			place_id:ids[0],
			twitter:'appcelerator',
			name:'APPCELERATOR HQ'
		};
		Cloud.Places.update(data, function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.error).shouldBeFalse();
			valueOf(testRun, e.places.length).shouldBe(1);
			valueOf(testRun, e.places[0].name).shouldBe('APPCELERATOR HQ');
			valueOf(testRun, e.places[0].id).shouldBe(ids[0]);
			valueOf(testRun, e.places[0].twitter).shouldBe('appcelerator');
			valueOf(testRun, e.places[0].city).shouldBe('Mountain View');
			finish(testRun);
		});
	};
	// NOTE: TIMOB-9806 prevents this test from running on MobileWeb
	this.testUpdate.platforms = { android:1, iphone:1, ipad:1, mobileweb:0 };

	this.testQuery = function (testRun) {
		var data = {
			where:{
				city:{ '$in':[ 'Mountain View', 'Cupertino' ] }
			}
		};
		Cloud.Places.query(data, function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.error).shouldBeFalse();
			valueOf(testRun, e.places.length).shouldBe(2);
			valueOf(testRun, e.places[0].id).shouldBeOneOf(ids);
			valueOf(testRun, e.places[1].id).shouldBeOneOf(ids);
			finish(testRun);
		});
	};
	// NOTE: TIMOB-9806 prevents this test from running on MobileWeb
	this.testQuery.platforms = { android:1, iphone:1, ipad:1, mobileweb:0 };

	this.testQueryAndDeleteAll = function (testRun) {
		var ids = [];
		var queryResult1 = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.error).shouldBeFalse();
			for (var i = 0; i < e.places.length; i++) {
				ids.push(e.places[i].id);
			}
			deletePlace(e);
		};

		var deletePlace = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.error).shouldBeFalse();
			if (ids.length == 0) {
				Cloud.Places.query(queryResult2);
			} else {
				Cloud.Places.remove({ place_id:ids.pop() }, deletePlace);
			}
		};

		var queryResult2 = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.error).shouldBeFalse();
			valueOf(testRun, e.places.length).shouldBe(0);
			valueOf(testRun, e.meta.total_results).shouldBe(0);
			finish(testRun);
		};

		Cloud.Places.query(queryResult1);
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