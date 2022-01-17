function () {
	var finish;
	var valueOf;
	var Cloud;
	this.init = function (testUtils) {
		finish = testUtils.finish;
		valueOf = testUtils.valueOf;
		Cloud = require('ti.cloud');
	};

	this.name = "cloud photos";

	function verifyAPIs(testRun, namespace, functions) {
		for (var i = 0; i < functions.length; i++) {
			valueOf(testRun, Cloud[namespace][functions[i]]).shouldBeFunction();
		}
	}

	var drillbitUserId;
	var ids = [];

	// ---------------------------------------------------------------
	// Cloud.Photos
	// ---------------------------------------------------------------

	// Test that all of the namespace APIs are available
	this.testApi = function (testRun) {
		// Verify that all of the methods are exposed
		verifyAPIs(testRun, 'Photos', [
			'create',
			'show',
			'search',
			'query',
			'update',
			'remove'
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
			photo:Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'appcelerator.jpg'),
			tags:'appcelerator, logo',
			'photo_sizes[preview]':'100x100#',
			'photo_sync_sizes[]':'preview'
		};

		var start = function () {
			Cloud.Photos.create(data, function (e) {
				valueOf(testRun, e.success).shouldBeTrue();
				valueOf(testRun, e.error).shouldBeFalse();
				valueOf(testRun, e.photos.length).shouldBe(1);
				ids.push(e.photos[0].id);
				finish(testRun);
			});
		};

		// NOTE: We need to wait a little bit for the photos to be processed. So,
		// for testing we insert a slight delay so that the photos can be processed
		setTimeout(start, 5000);
	};
	// NOTE: TIMOB-9806 prevents this test from running on MobileWeb
	this.testCreate.platforms = { android:1, iphone:1, ipad:1, mobileweb:0 };

	this.testCreateAndSearch = function (testRun) {
		var data = {
			photo:Titanium.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'apple_logo.jpg'),
			tags:'apple, logo',
			'photo_sizes[preview]':'100x100#',
			'photo_sync_sizes[]':'preview'
		};

		var photoCreated = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.error).shouldBeFalse();
			valueOf(testRun, e.photos.length).shouldBe(1);
			ids.push(e.photos[0].id);
			Cloud.Photos.search({ user_id:drillbitUserId }, searchResult);
		};

		var searchResult = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.error).shouldBeFalse();
			valueOf(testRun, e.photos.length).shouldBe(2);
			valueOf(testRun, e.photos[0].id).shouldBeOneOf(ids);
			valueOf(testRun, e.photos[1].id).shouldBeOneOf(ids);
			finish(testRun);
		};

		var start = function () {
			Cloud.Photos.create(data, photoCreated);
		};

		// NOTE: We need to wait a little bit for the photos to be processed. So,
		// for testing we insert a slight delay so that the photos can be processed
		setTimeout(start, 5000);
	};
	// NOTE: TIMOB-9806 prevents this test from running on MobileWeb
	this.testCreateAndSearch.platforms = { android:1, iphone:1, ipad:1, mobileweb:0 };

	this.testShow = function (testRun) {
		var data = {
			photo_id:ids[0]
		};

		var start = function () {
			Cloud.Photos.show(data, function (e) {
				valueOf(testRun, e.success).shouldBeTrue();
				valueOf(testRun, e.error).shouldBeFalse();
				valueOf(testRun, e.photos.length).shouldBe(1);
				valueOf(testRun, e.photos[0].id).shouldBe(ids[0]);
				finish(testRun);
			});
		};

		// NOTE: We need to wait a little bit for the photos to be processed. So,
		// for testing we insert a slight delay so that the photos can be processed
		setTimeout(start, 5000);
	};
	// NOTE: TIMOB-9806 prevents this test from running on MobileWeb
	this.testShow.platforms = { android:1, iphone:1, ipad:1, mobileweb:0 };

	this.testUpdate = function (testRun) {
		var data = {
			photo_id:ids[0],
			tags:'appcelerator, logo, test',
			custom_data_fields:{
				year:2012
			},
			'photo_sizes[preview]':'100x100#',
			'photo_sync_sizes[]':'preview'
		};

		var start = function () {
			Cloud.Photos.update(data, function (e) {
				valueOf(testRun, e.success).shouldBeTrue();
				valueOf(testRun, e.error).shouldBeFalse();
				valueOf(testRun, e.photos.length).shouldBe(1);
				valueOf(testRun, e.photos[0].id).shouldBe(ids[0]);
				valueOf(testRun, e.photos[0].tags).shouldContain('appcelerator');
				valueOf(testRun, e.photos[0].tags).shouldContain('logo');
				valueOf(testRun, e.photos[0].tags).shouldContain('test');
				finish(testRun);
			});
		};

		// NOTE: We need to wait a little bit for the photos to be processed. So,
		// for testing we insert a slight delay so that the photos can be processed
		setTimeout(start, 5000);
	};
	// NOTE: TIMOB-9806 prevents this test from running on MobileWeb
	this.testUpdate.platforms = { android:1, iphone:1, ipad:1, mobileweb:0 };

	this.testQuery = function (testRun) {
		var start = function () {
			Cloud.Photos.query(function (e) {
				valueOf(testRun, e.success).shouldBeTrue();
				valueOf(testRun, e.error).shouldBeFalse();
				valueOf(testRun, e.photos.length).shouldBe(2);
				valueOf(testRun, e.photos[0].id).shouldBeOneOf(ids);
				valueOf(testRun, e.photos[1].id).shouldBeOneOf(ids);
				finish(testRun);
			});
		};

		// NOTE: We need to wait a little bit for the photos to be processed. So,
		// for testing we insert a slight delay so that the photos can be processed
		setTimeout(start, 5000);
	};
	// NOTE: TIMOB-9806 prevents this test from running on MobileWeb
	this.testQuery.platforms = { android:1, iphone:1, ipad:1, mobileweb:0 };

	this.testQueryAndDeleteAll = function (testRun) {
		var ids = [];

		var queryResult1 = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.error).shouldBeFalse();
			for (var i = 0; i < e.photos.length; i++) {
				ids.push(e.photos[i].id);
			}
			deletePhoto(e);
		};

		var deletePhoto = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.error).shouldBeFalse();
			if (ids.length == 0) {
				// NOTE: We need to wait a little bit for the photos to be processed. So,
				// for testing we insert a slight delay so that the photos can be processed
				setTimeout(query2, 5000);
			} else {
				Cloud.Photos.remove({ photo_id:ids.pop() }, deletePhoto);
			}
		};

		var query2 = function () {
			Cloud.Photos.query(function (e) {
				valueOf(testRun, e.success).shouldBeTrue();
				valueOf(testRun, e.error).shouldBeFalse();
				valueOf(testRun, e.photos.length).shouldBe(0);
				valueOf(testRun, e.meta.total_results).shouldBe(0);
				finish(testRun);
			});
		};

		var start = function () {
			Cloud.Photos.query(queryResult1);
		};

		// NOTE: We need to wait a little bit for the photos to be processed. So,
		// for testing we insert a slight delay so that the photos can be processed
		setTimeout(start, 5000);
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