function () {
	var finish;
	var valueOf;
	var Cloud;
	this.init = function (testUtils) {
		finish = testUtils.finish;
		valueOf = testUtils.valueOf;
		Cloud = require('ti.cloud');
	};

	this.name = "cloud friends";

	// ---------------------------------------------------------------
	// Cloud.Friends
	// ---------------------------------------------------------------

	// Test that all of the namespace APIs are available
	this.testApi = function (testRun) {
		// Verify that all of the methods are exposed
		valueOf(testRun, Cloud.Friends.add).shouldBeFunction();
		valueOf(testRun, Cloud.Friends.requests).shouldBeFunction();
		valueOf(testRun, Cloud.Friends.approve).shouldBeFunction();
		valueOf(testRun, Cloud.Friends.remove).shouldBeFunction();
		valueOf(testRun, Cloud.Friends.search).shouldBeFunction();
		finish(testRun);
	};

	this.testAddFriend = function (testRun) {
		var loggedOut = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			finish(testRun);
		};

		var friendAdded = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			Cloud.Users.logout(loggedOut);
		};

		var friendFound = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			Cloud.Friends.add({
				user_ids:e.users[0].id
			}, friendAdded);
		};

		var loggedIn = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			Cloud.Users.search({
				q:'chatUser'
			}, friendFound);
		};

		Cloud.Users.login({
			login:'drillbituser',
			password:'password'
		}, loggedIn);
	};

	this.testRequestsAndApprove = function (testRun) {
		var loggedOut = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			finish(testRun);
		};

		var friendApproved = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			Cloud.Users.logout(loggedOut);
		};

		var requestsFound = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.friend_requests.length).shouldBe(1);
			valueOf(testRun, e.friend_requests[0].user.username).shouldBe("drillbituser");
			Cloud.Friends.approve({
				user_ids:e.friend_requests[0].user.id
			}, friendApproved);
		};

		var loggedIn = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			Cloud.Friends.requests(requestsFound);
		};

		Cloud.Users.login({
			login:'chatuser',
			password:'password'
		}, loggedIn);
	};

	this.testSearch = function (testRun) {
		var loggedOut = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			finish(testRun);
		};

		var searchResult = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.users.length).shouldBe(1);
			valueOf(testRun, e.users[0].username).shouldBe("chatuser");
			Cloud.Users.logout(loggedOut);
		};

		var loggedIn = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			Cloud.Friends.search({
				user_id:e.users[0].id
			}, searchResult);
		};

		Cloud.Users.login({
			login:'drillbituser',
			password:'password'
		}, loggedIn);
	};

	this.testRemove1 = function (testRun) {
		var loggedOut = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			finish(testRun);
		};

		var friendsRemoved = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			Cloud.Users.logout(loggedOut);
		};

		var searchResult = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.users.length).shouldBe(1);
			Cloud.Friends.remove({
				user_ids:e.users[0].id
			}, friendsRemoved)
		};

		var loggedIn = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			Cloud.Friends.search({
				user_id:e.users[0].id
			}, searchResult);
		};

		Cloud.Users.login({
			login:'drillbituser',
			password:'password'
		}, loggedIn);
	};

	this.testRemove2 = function (testRun) {
		var loggedOut = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			finish(testRun);
		};

		var searchResult = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.users.length).shouldBe(0);
			Cloud.Users.logout(loggedOut);
		};

		var loggedIn = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			Cloud.Friends.search({
				user_id:e.users[0].id
			}, searchResult);
		};

		Cloud.Users.login({
			login:'chatuser',
			password:'password'
		}, loggedIn);
	};

	// Populate the array of tests based on the 'hammer' convention
	this.tests = require('hammer').populateTests(this, 30000);
}