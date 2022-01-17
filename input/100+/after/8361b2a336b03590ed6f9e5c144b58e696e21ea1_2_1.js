function () {
	var finish;
	var valueOf;
	var Cloud;
	this.init = function (testUtils) {
		finish = testUtils.finish;
		valueOf = testUtils.valueOf;
		Cloud = require('ti.cloud');
	};

	this.name = "cloud ACLs";

	function verifyAPIs(testRun, namespace, functions) {
		for (var i = 0; i < functions.length; i++) {
			valueOf(testRun, Cloud[namespace][functions[i]]).shouldBeFunction();
		}
	}

	var drillbitUserId;
	var chatUserId;

	// ---------------------------------------------------------------
	// Cloud.ACLs
	// ---------------------------------------------------------------

	// Test that all of the namespace APIs are available
	this.testApi = function (testRun) {
		// Verify that all of the methods are exposed
		verifyAPIs(testRun, 'ACLs', [
			'create',
			'update',
			'show',
			'remove',
			'addUser',
			'removeUser',
			'checkUser'
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
			name:'testACL'
		};
		Cloud.ACLs.create(data, function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.error).shouldBeFalse();
			valueOf(testRun, e.acls[0].public_read).shouldBeFalse();
			valueOf(testRun, e.acls[0].public_write).shouldBeFalse();
			valueOf(testRun, e.acls[0].readers.length).shouldBe(1);
			valueOf(testRun, e.acls[0].writers.length).shouldBe(1);
			finish(testRun);
		});
	};

	this.testShow = function (testRun) {
		var data = {
			name:'testACL'
		};
		Cloud.ACLs.show(data, function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.error).shouldBeFalse();
			valueOf(testRun, e.acls[0].public_read).shouldBeFalse();
			valueOf(testRun, e.acls[0].public_write).shouldBeFalse();
			valueOf(testRun, e.acls[0].readers.length).shouldBe(1);
			valueOf(testRun, e.acls[0].writers.length).shouldBe(1);
			finish(testRun);
		});
	};

	this.testUpdate = function (testRun) {
		var data = {
			name:'testACL',
			public_read:true,
			public_write:true
		};
		Cloud.ACLs.update(data, function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.error).shouldBeFalse();
			valueOf(testRun, e.acls[0].public_read).shouldBeTrue();
			valueOf(testRun, e.acls[0].public_write).shouldBeTrue();
			valueOf(testRun, e.acls[0].readers).shouldBeUndefined();
			valueOf(testRun, e.acls[0].writers).shouldBeUndefined();
			finish(testRun);
		});
	};

	this.testAddRemoveUsers = function (testRun) {
		var data = {
			name:'testACL',
			public_read:false,
			public_write:false
		};

		var update1 = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.error).shouldBeFalse();
			valueOf(testRun, e.acls[0].public_read).shouldBeFalse();
			valueOf(testRun, e.acls[0].public_write).shouldBeFalse();
			valueOf(testRun, e.acls[0].readers.length).shouldBe(1);
			valueOf(testRun, e.acls[0].writers.length).shouldBe(1);
			Cloud.Users.query(queryResult1);
		};

		var queryResult1 = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.error).shouldBeFalse();
			valueOf(testRun, e.users.length).shouldBe(2);
			chatUserId = (e.users[0].id == drillbitUserId) ? e.users[1].id : e.users[0].id;
			Cloud.ACLs.addUser({
				name:'testACL',
				reader_ids:chatUserId,
				writer_ids:chatUserId
			}, userAdded1);
		};

		var userAdded1 = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.error).shouldBeFalse();
			Cloud.ACLs.show({
				name:'testACL'
			}, shown1);
		};

		var shown1 = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.error).shouldBeFalse();
			valueOf(testRun, e.acls[0].public_read).shouldBeFalse();
			valueOf(testRun, e.acls[0].public_write).shouldBeFalse();
			valueOf(testRun, e.acls[0].readers.length).shouldBe(2);
			valueOf(testRun, e.acls[0].writers.length).shouldBe(2);
			Cloud.ACLs.removeUser({
				name:'testACL',
				reader_ids:chatUserId,
				writer_ids:''
			}, removed1);
		};

		var removed1 = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.error).shouldBeFalse();
			Cloud.ACLs.show({
				name:'testACL'
			}, shown2);
		};

		var shown2 = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.error).shouldBeFalse();
			valueOf(testRun, e.acls[0].public_read).shouldBeFalse();
			valueOf(testRun, e.acls[0].public_write).shouldBeFalse();
			valueOf(testRun, e.acls[0].readers.length).shouldBe(1);
			valueOf(testRun, e.acls[0].writers.length).shouldBe(2);
			valueOf(testRun, e.acls[0].readers[0]).shouldBe(drillbitUserId);
			finish(testRun);
		};

		Cloud.ACLs.update(data, update1);
	};

	this.testCheckUser = function (testRun) {
		var checkResult1 = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.error).shouldBeFalse();
			valueOf(testRun, e.permission['read_permission']).shouldBeTrue();
			valueOf(testRun, e.permission['write_permission']).shouldBeTrue();
			Cloud.ACLs.checkUser({
				name:'testACL',
				user_id:chatUserId
			}, checkResult2);
		};

		var checkResult2 = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.error).shouldBeFalse();
			valueOf(testRun, e.permission['read_permission']).shouldBeFalse();
			valueOf(testRun, e.permission['write_permission']).shouldBeTrue();
			finish(testRun);
		};

		Cloud.ACLs.checkUser({
			name:'testACL',
			user_id:drillbitUserId
		}, checkResult1);
	};

	this.testCleanup = function (testRun) {
		var data = {
			name:'testACL'
		};
		Cloud.ACLs.remove(data, function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.error).shouldBeFalse();
			finish(testRun);
		});
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