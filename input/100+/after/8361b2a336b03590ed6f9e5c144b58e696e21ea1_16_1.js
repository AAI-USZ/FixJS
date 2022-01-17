function () {
	var finish;
	var valueOf;
	var Cloud;
	this.init = function (testUtils) {
		finish = testUtils.finish;
		valueOf = testUtils.valueOf;
		Cloud = require('ti.cloud');
	};

	this.name = "cloud posts";

	function verifyAPIs(testRun, namespace, functions) {
		for (var i = 0; i < functions.length; i++) {
			valueOf(testRun, Cloud[namespace][functions[i]]).shouldBeFunction();
		}
	}

	var drillbitUserId;
	var ids = [];

	// ---------------------------------------------------------------
	// Cloud.Posts
	// ---------------------------------------------------------------

	// Test that all of the namespace APIs are available
	this.testApi = function (testRun) {
		// Verify that all of the methods are exposed
		verifyAPIs(testRun, 'Posts', [
			'create',
			'show',
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
			content:'Welcome to Drillbit',
			title:'Welcome',
			photo:Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'appcelerator.jpg')
		};
		Cloud.Posts.create(data, function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.error).shouldBeFalse();
			valueOf(testRun, e.posts.length).shouldBe(1);
			valueOf(testRun, e.posts[0].title).shouldBe('Welcome');
			valueOf(testRun, e.posts[0].content).shouldBe('Welcome to Drillbit');
			valueOf(testRun, e.posts[0].photo).shouldBeObject();
			valueOf(testRun, e.posts[0].user.id).shouldBe(drillbitUserId);
			ids.push(e.posts[0].id);
			finish(testRun);
		});
	};
	// NOTE: TIMOB-9806 prevents this test from running on MobileWeb
	this.testCreate.platforms = { android:1, iphone:1, ipad:1, mobileweb:0 };

	this.testCreateAndShow = function (testRun) {
		var data = {
			content:'Welcome to Hawaii',
			title:'Aloha'
		};

		var postCreated = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.error).shouldBeFalse();
			valueOf(testRun, e.posts.length).shouldBe(1);
			valueOf(testRun, e.posts[0].title).shouldBe('Aloha');
			valueOf(testRun, e.posts[0].content).shouldBe('Welcome to Hawaii');
			ids.push(e.posts[0].id);
			Cloud.Posts.show({ post_id:ids[0] }, postShown);
		};

		var postShown = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.error).shouldBeFalse();
			valueOf(testRun, e.posts.length).shouldBe(1);
			valueOf(testRun, e.posts[0].id).shouldBe(ids[0]);
			valueOf(testRun, e.posts[0].title).shouldBe('Welcome');
			valueOf(testRun, e.posts[0].content).shouldBe('Welcome to Drillbit');
			valueOf(testRun, e.posts[0].photo).shouldBeObject();
			valueOf(testRun, e.posts[0].user.id).shouldBe(drillbitUserId);
			finish(testRun);
		};

		Cloud.Posts.create(data, postCreated);
	};
	// NOTE: TIMOB-9806 prevents this test from running on MobileWeb
	this.testCreateAndShow.platforms = { android:1, iphone:1, ipad:1, mobileweb:0 };

	this.testShow = function (testRun) {
		var data = {
			post_ids:ids.toString()
		};
		Cloud.Posts.show(data, function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.error).shouldBeFalse();
			valueOf(testRun, e.posts.length).shouldBe(2);
			valueOf(testRun, e.posts[0].id).shouldBeOneOf(ids);
			valueOf(testRun, e.posts[1].id).shouldBeOneOf(ids);
			finish(testRun);
		});
	};
	// NOTE: TIMOB-9806 prevents this test from running on MobileWeb
	this.testShow.platforms = { android:1, iphone:1, ipad:1, mobileweb:0 };

	this.testUpdate = function (testRun) {
		var data = {
			post_id:ids[1],
			content:'Welcome to the Hawaiian Islands'
		};
		Cloud.Posts.update(data, function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.error).shouldBeFalse();
			valueOf(testRun, e.posts.length).shouldBe(1);
			valueOf(testRun, e.posts[0].id).shouldBe(ids[1]);
			valueOf(testRun, e.posts[0].title).shouldBe('Aloha');
			valueOf(testRun, e.posts[0].content).shouldBe('Welcome to the Hawaiian Islands');
			valueOf(testRun, e.posts[0].user.id).shouldBe(drillbitUserId);
			finish(testRun);
		});
	};
	// NOTE: TIMOB-9806 prevents this test from running on MobileWeb
	this.testUpdate.platforms = { android:1, iphone:1, ipad:1, mobileweb:0 };

	this.testQuery = function (testRun) {
		var data = {
			where:{
				title:'Welcome'
			}
		};
		Cloud.Posts.query(data, function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.error).shouldBeFalse();
			valueOf(testRun, e.posts.length).shouldBe(1);
			valueOf(testRun, e.posts[0].title).shouldBe('Welcome');
			valueOf(testRun, e.posts[0].content).shouldBe('Welcome to Drillbit');
			valueOf(testRun, e.posts[0].photo).shouldBeObject();
			valueOf(testRun, e.posts[0].user.id).shouldBe(drillbitUserId);
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
			for (var i = 0; i < e.posts.length; i++) {
				ids.push(e.posts[i].id);
			}
			removePost(e);
		};

		var removePost = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.error).shouldBeFalse();
			if (ids.length == 0) {
				Cloud.Posts.query(queryResult2);
			} else {
				Cloud.Posts.remove({ post_id:ids.pop() }, removePost);
			}
		};

		var queryResult2 = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.error).shouldBeFalse();
			valueOf(testRun, e.posts.length).shouldBe(0);
			valueOf(testRun, e.meta.total_results).shouldBe(0);
			finish(testRun);
		};

		Cloud.Posts.query(queryResult1);
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