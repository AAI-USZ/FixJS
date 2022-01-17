function () {
	var finish;
	var valueOf;
	var Cloud;
	this.init = function (testUtils) {
		finish = testUtils.finish;
		valueOf = testUtils.valueOf;
		Cloud = require('ti.cloud');
	};

	this.name = "cloud photo collections";

	function verifyAPIs(testRun, namespace, functions) {
		for (var i = 0; i < functions.length; i++) {
			valueOf(testRun, Cloud[namespace][functions[i]]).shouldBeFunction();
		}
	}

	var drillbitUserId;
	var ids = [];
	var photoIds = [];
	var subIds = [];

	// ---------------------------------------------------------------
	// Cloud.PhotoCollections
	// ---------------------------------------------------------------

	// Test that all of the namespace APIs are available
	this.testApi = function (testRun) {
		// Verify that all of the methods are exposed
		verifyAPIs(testRun, 'PhotoCollections', [
			'create',
			'show',
			'update',
			'search',
			'showSubcollections',
			'showPhotos',
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
			name:'collection1'
		};
		Cloud.PhotoCollections.create(data, function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.error).shouldBeFalse();
			valueOf(testRun, e.collections.length).shouldBe(1);
			valueOf(testRun, e.collections[0].name).shouldBe('collection1');
			valueOf(testRun, e.collections[0].counts).shouldBeObject();
			valueOf(testRun, e.collections[0].counts.photos).shouldBe(0);
			valueOf(testRun, e.collections[0].counts.total_photos).shouldBe(0);
			valueOf(testRun, e.collections[0].counts.subcollections).shouldBe(0);
			ids.push(e.collections[0].id);
			finish(testRun);
		});
	};

	this.testShow = function (testRun) {
		var data = {
			collection_id:ids[0]
		};
		Cloud.PhotoCollections.show(data, function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.error).shouldBeFalse();
			valueOf(testRun, e.collections.length).shouldBe(1);
			valueOf(testRun, e.collections[0].name).shouldBe('collection1');
			valueOf(testRun, e.collections[0].counts).shouldBeObject();
			valueOf(testRun, e.collections[0].counts.photos).shouldBe(0);
			valueOf(testRun, e.collections[0].counts.total_photos).shouldBe(0);
			valueOf(testRun, e.collections[0].counts.subcollections).shouldBe(0);
			finish(testRun);
		});
	};

	this.testUpdate = function (testRun) {
		var data = {
			photo:Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'apple_logo.jpg'),
			tags:'apple, logo',
			'photo_sizes[preview]':'100x100#',
			'photo_sync_sizes[]':'preview'
		};

		var created = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.error).shouldBeFalse();
			valueOf(testRun, e.photos.length).shouldBe(1);
			photoIds.push(e.photos[0].id);
			Cloud.PhotoCollections.update({
				collection_id:ids[0],
				cover_photo_id:photoIds[0],
				custom_fields:{
					company:'Apple',
					category:'logo'
				}
			}, updated);
		};

		var updated = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.error).shouldBeFalse();
			valueOf(testRun, e.collections.length).shouldBe(1);
			valueOf(testRun, e.collections[0].name).shouldBe('collection1');
			valueOf(testRun, e.collections[0].counts).shouldBeObject();
			valueOf(testRun, e.collections[0].counts.photos).shouldBe(0);
			valueOf(testRun, e.collections[0].counts.total_photos).shouldBe(0);
			valueOf(testRun, e.collections[0].counts.subcollections).shouldBe(0);
			valueOf(testRun, e.collections[0].cover_photo).shouldBeObject();
			valueOf(testRun, e.collections[0].cover_photo.id).shouldBe(photoIds[0]);
			valueOf(testRun, e.collections[0].cover_photo.tags).shouldContain('apple');
			valueOf(testRun, e.collections[0].cover_photo.tags).shouldContain('logo');
			valueOf(testRun, e.collections[0].custom_fields).shouldBeObject();
			valueOf(testRun, e.collections[0].custom_fields.company).shouldBe('Apple');
			valueOf(testRun, e.collections[0].custom_fields.category).shouldBe('logo');
			finish(testRun);
		};

		Cloud.Photos.create(data, created);
	};
	// NOTE: TIMOB-9806 prevents this test from running on MobileWeb
	this.testUpdate.platforms = { android:1, iphone:1, ipad:1, mobileweb:0 };

	this.testSearch = function (testRun) {
		var data = {
			user_id:drillbitUserId
		};
		Cloud.PhotoCollections.search(data, function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.error).shouldBeFalse();
			valueOf(testRun, e.meta.total_pages).shouldBe(1);
			valueOf(testRun, e.meta.total_results).shouldBe(1);
			valueOf(testRun, e.collections.length).shouldBe(1);
			valueOf(testRun, e.collections[0].name).shouldBe('collection1');
			valueOf(testRun, e.collections[0].counts).shouldBeObject();
			valueOf(testRun, e.collections[0].counts.photos).shouldBe(0);
			valueOf(testRun, e.collections[0].counts.total_photos).shouldBe(0);
			finish(testRun);
		});
	};

	this.testCreateAndAddPhoto = function (testRun) {
		var created1 = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.error).shouldBeFalse();
			valueOf(testRun, e.collections.length).shouldBe(1);
			valueOf(testRun, e.collections[0].name).shouldBe('collection2');
			valueOf(testRun, e.collections[0].counts).shouldBeObject();
			valueOf(testRun, e.collections[0].counts.photos).shouldBe(0);
			valueOf(testRun, e.collections[0].counts.total_photos).shouldBe(0);
			valueOf(testRun, e.collections[0].counts.subcollections).shouldBe(0);
			ids.push(e.collections[0].id);
			Cloud.Photos.create({
				photo:Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'appcelerator.jpg'),
				tags:'appcelerator, logo',
				'photo_sizes[preview]':'100x100#',
				'photo_sync_sizes[]':'preview',
				collection_id:ids[1]
			}, created2);
		};

		var created2 = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.error).shouldBeFalse();
			valueOf(testRun, e.photos.length).shouldBe(1);
			photoIds.push(e.photos[0].id);
			Cloud.PhotoCollections.show({
				collection_id:ids[1]
			}, shown);
		};

		var shown = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.error).shouldBeFalse();
			valueOf(testRun, e.collections.length).shouldBe(1);
			valueOf(testRun, e.collections[0].name).shouldBe('collection2');
			valueOf(testRun, e.collections[0].counts).shouldBeObject();
			valueOf(testRun, e.collections[0].counts.photos).shouldBe(1);
			valueOf(testRun, e.collections[0].counts.total_photos).shouldBe(1);
			valueOf(testRun, e.collections[0].counts.subcollections).shouldBe(0);
			finish(testRun);
		};

		Cloud.PhotoCollections.create({ name:'collection2' }, created1);
	};
	// NOTE: TIMOB-9806 prevents this test from running on MobileWeb
	this.testCreateAndAddPhoto.platforms = { android:1, iphone:1, ipad:1, mobileweb:0 };

	this.testSearchAgain = function (testRun) {
		var data = {
			user_id:drillbitUserId
		};
		Cloud.PhotoCollections.search(data, function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.error).shouldBeFalse();
			valueOf(testRun, e.meta.total_pages).shouldBe(1);
			valueOf(testRun, e.meta.total_results).shouldBe(2);
			valueOf(testRun, e.collections.length).shouldBe(2);
			for (var i = 0; i < e.collections.length; i++) {
				if (e.collections[i].name == 'collection1') {
					valueOf(testRun, e.collections[i].counts).shouldBeObject();
					valueOf(testRun, e.collections[i].counts.photos).shouldBe(0);
					valueOf(testRun, e.collections[i].counts.total_photos).shouldBe(0);
				} else if (e.collections[i].name == 'collection2') {
					valueOf(testRun, e.collections[i].counts).shouldBeObject();
					valueOf(testRun, e.collections[i].counts.photos).shouldBe(1);
					valueOf(testRun, e.collections[i].counts.total_photos).shouldBe(1);
				} else {
					valueOf(testRun, true).shouldBeFalse();
				}
			}
			finish(testRun);
		});
	};
	// NOTE: TIMOB-9806 prevents this test from running on MobileWeb
	this.testSearchAgain.platforms = { android:1, iphone:1, ipad:1, mobileweb:0 };

	this.testShowPhotos = function (testRun) {
		var data = {
			collection_id:ids[1]
		};
		Cloud.PhotoCollections.showPhotos(data, function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.error).shouldBeFalse();
			valueOf(testRun, e.photos.length).shouldBe(1);
			valueOf(testRun, e.photos[0].id).shouldBe(photoIds[1]);
			finish(testRun);
		});
	};
	// NOTE: TIMOB-9806 prevents this test from running on MobileWeb
	this.testShowPhotos.platforms = { android:1, iphone:1, ipad:1, mobileweb:0 };

	this.testCreateSubcollection = function (testRun) {
		var data = {
			name:'subcollection1',
			parent_collection_id:ids[0]
		};
		Cloud.PhotoCollections.create(data, function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.error).shouldBeFalse();
			valueOf(testRun, e.collections.length).shouldBe(1);
			valueOf(testRun, e.collections[0].name).shouldBe('subcollection1');
			valueOf(testRun, e.collections[0].counts).shouldBeObject();
			valueOf(testRun, e.collections[0].counts.photos).shouldBe(0);
			valueOf(testRun, e.collections[0].counts.total_photos).shouldBe(0);
			valueOf(testRun, e.collections[0].counts.subcollections).shouldBe(0);
			subIds.push(e.collections[0].id);
			finish(testRun);
		});
	};

	this.testShowParent = function (testRun) {
		var data = {
			collection_id:ids[0]
		};
		Cloud.PhotoCollections.show(data, function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.error).shouldBeFalse();
			valueOf(testRun, e.collections.length).shouldBe(1);
			valueOf(testRun, e.collections[0].name).shouldBe('collection1');
			valueOf(testRun, e.collections[0].counts).shouldBeObject();
			valueOf(testRun, e.collections[0].counts.photos).shouldBe(0);
			valueOf(testRun, e.collections[0].counts.total_photos).shouldBe(0);
			valueOf(testRun, e.collections[0].counts.subcollections).shouldBe(1);
			finish(testRun);
		});
	};

	this.testShowSubcollections = function (testRun) {
		var data = {
			collection_id:ids[0]
		};
		Cloud.PhotoCollections.showSubcollections(data, function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.error).shouldBeFalse();
			valueOf(testRun, e.collections.length).shouldBe(1);
			valueOf(testRun, e.collections[0].name).shouldBe('subcollection1');
			valueOf(testRun, e.collections[0].counts).shouldBeObject();
			valueOf(testRun, e.collections[0].counts.photos).shouldBe(0);
			valueOf(testRun, e.collections[0].counts.total_photos).shouldBe(0);
			valueOf(testRun, e.collections[0].counts.subcollections).shouldBe(0);
			valueOf(testRun, e.collections[0].id).shouldBe(subIds[0]);
			finish(testRun);
		});
	};

	this.testQueryAndDeleteAllPhotos = function (testRun) {
		var photoIds = [];

		var queryResult = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.error).shouldBeFalse();
			for (var i = 0; i < e.photos.length; i++) {
				photoIds.push(e.photos[i].id);
			}
			removePhoto(e);
		};

		var removePhoto = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.error).shouldBeFalse();
			if (photoIds.length == 0) {
				finish(testRun);
			} else {
				Cloud.Photos.remove({ photo_id:photoIds.pop() }, removePhoto);
			}
		};

		// Delete all of the photos
		Cloud.Photos.query(queryResult);
	};

	this.testQueryAndDeleteAllCollections = function (testRun) {
		var collectionIds = [];
		var subIds = [];

		var searchResult = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.error).shouldBeFalse();
			for (var i = 0; i < e.collections.length; i++) {
				collectionIds.push(e.collections[i].id);
				if (e.collections[i].counts.subcollections > 0) {
					subIds.push(e.collections[i].id);
				}
			}
			e.collections = [];
			querySubCollections(e);
		};

		var querySubCollections = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.error).shouldBeFalse();
			for (var i = 0; i < e.collections.length; i++) {
				collectionIds.push(e.collections[i].id);
			}
			if (subIds.length == 0) {
				removeCollection(e);
			} else {
				Cloud.PhotoCollections.showSubcollections({ collection_id:subIds.pop() }, querySubCollections);
			}
		};

		var removeCollection = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.error).shouldBeFalse();
			if (collectionIds.length == 0) {
				finish(testRun);
			} else {
				Cloud.PhotoCollections.remove({ collection_id:collectionIds.pop() }, removeCollection);
			}
		};

		// Delete all of the photo collections
		Cloud.PhotoCollections.search({ user_id:drillbitUserId }, searchResult);
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