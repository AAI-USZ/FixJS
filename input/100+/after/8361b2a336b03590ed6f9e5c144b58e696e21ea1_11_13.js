function () {
	var finish;
	var valueOf;
	var Cloud;
	this.init = function (testUtils) {
		finish = testUtils.finish;
		valueOf = testUtils.valueOf;
		Cloud = require('ti.cloud');
	};

	this.name = "cloud messages";

	// ---------------------------------------------------------------
	// Cloud.Messages
	// ---------------------------------------------------------------

	var drillbitUserId;
	var chatUserId;
	var threadId;
	var messageId;

	function deleteAllMessagesForUser(testRun, userId, password) {
		var ids = [];

		var loggedOut = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			finish(testRun);
		};

		var deleteSentMessage = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			if (ids.length == 0) {
				Cloud.Users.logout(loggedOut);
			} else {
				Cloud.Messages.remove({
					message_id:ids.pop()
				}, deleteSentMessage);
			}
		};

		var sentResult = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			for (var i = 0; i < e.messages.length; i++) {
				ids.push(e.messages[i].id);
			}
			deleteSentMessage(e);
		};

		var deleteInboxMessage = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			if (ids.length == 0) {
				Cloud.Messages.showSent(sentResult);
			} else {
				Cloud.Messages.remove({
					message_id:ids.pop()
				}, deleteInboxMessage);
			}
		};

		var inboxResult = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			for (var i = 0; i < e.messages.length; i++) {
				ids.push(e.messages[i].id);
			}
			deleteInboxMessage(e);
		};

		var loggedIn = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			Cloud.Messages.showInbox(inboxResult);
		};

		Cloud.Users.login({
			login:userId,
			password:password
		}, loggedIn);
	}

	// ---------------------------------------------------------------
	// Cloud.Messages
	// ---------------------------------------------------------------

	// Test that all of the namespace APIs are available
	this.testApi = function (testRun) {
		// Verify that all of the methods are exposed
		valueOf(testRun, Cloud.Messages.create).shouldBeFunction();
		valueOf(testRun, Cloud.Messages.reply).shouldBeFunction();
		valueOf(testRun, Cloud.Messages.show).shouldBeFunction();
		valueOf(testRun, Cloud.Messages.showInbox).shouldBeFunction();
		valueOf(testRun, Cloud.Messages.showSent).shouldBeFunction();
		valueOf(testRun, Cloud.Messages.showThreads).shouldBeFunction();
		valueOf(testRun, Cloud.Messages.showThread).shouldBeFunction();
		valueOf(testRun, Cloud.Messages.remove).shouldBeFunction();
		valueOf(testRun, Cloud.Messages.removeThread).shouldBeFunction();
		finish(testRun);
	};

	this.testCreate = function (testRun) {
		var loggedOut = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			finish(testRun);
		};

		var messageCreated = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.messages.length).shouldBe(1);
			valueOf(testRun, e.messages[0].status).shouldBe('sent');
			valueOf(testRun, e.messages[0].subject).shouldBe('Hello World');
			threadId = e.messages[0].thread_id;
			messageId = e.messages[0].id;
			Cloud.Users.logout(loggedOut);
		};

		var userFound = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			chatUserId = e.users[0].id;
			Cloud.Messages.create({
				to_ids:chatUserId,
				subject:'Hello World',
				body:'This is a test',
				custom_fields:{
					field1:"1",
					field2:"2"
				}
			}, messageCreated)
		};

		var loggedIn = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			drillbitUserId = e.users[0].id;
			Cloud.Users.search({
				q:'chatUser'
			}, userFound);
		};

		Cloud.Users.login({
			login:'drillbituser',
			password:'password'
		}, loggedIn);
	};

	this.testShowInboxAndReply = function (testRun) {
		var loggedOut = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			finish(testRun);
		};

		var messageReplied = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.messages.length).shouldBe(1);
			valueOf(testRun, e.messages[0].status).shouldBe('sent');
			valueOf(testRun, e.messages[0].subject).shouldBe('Hello World');
			valueOf(testRun, e.messages[0].thread_id).shouldBe(threadId);
			Cloud.Users.logout(loggedOut);
		};

		var inboxResult = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.messages.length).shouldBe(1);
			valueOf(testRun, e.messages[0].thread_id).shouldBe(threadId);
			valueOf(testRun, e.messages[0].subject).shouldBe('Hello World');
			valueOf(testRun, e.messages[0].body).shouldBe('This is a test');
			valueOf(testRun, e.messages[0].from.id).shouldBe(drillbitUserId);
			valueOf(testRun, e.messages[0].custom_fields.field1).shouldBe("1");
			valueOf(testRun, e.messages[0].custom_fields.field2).shouldBe("2");
			Cloud.Messages.reply({
				message_id:e.messages[0].id,
				body:'This is my reply to your test message'
			}, messageReplied)
		};

		var loggedIn = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			Cloud.Messages.showInbox(inboxResult);
		};

		Cloud.Users.login({
			login:'chatuser',
			password:'password'
		}, loggedIn);
	};

	this.testShowMessage = function (testRun) {
		var loggedOut = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			finish(testRun);
		};

		var showResult = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.messages.length).shouldBe(1);
			valueOf(testRun, e.messages[0].thread_id).shouldBe(threadId);
			valueOf(testRun, e.messages[0].subject).shouldBe('Hello World');
			valueOf(testRun, e.messages[0].body).shouldBe('This is a test');
			valueOf(testRun, e.messages[0].from.id).shouldBe(drillbitUserId);
			valueOf(testRun, e.messages[0].custom_fields.field1).shouldBe("1");
			valueOf(testRun, e.messages[0].custom_fields.field2).shouldBe("2");
			Cloud.Users.logout(loggedOut);
		};

		var loggedIn = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			Cloud.Messages.show({
				message_id:messageId
			}, showResult);
		};

		Cloud.Users.login({
			login:'drillbituser',
			password:'password'
		}, loggedIn);
	};

	this.testShowMessageThreads = function (testRun) {
		var loggedOut = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			finish(testRun);
		};

		var showResult = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.messages.length).shouldBe(1);
			valueOf(testRun, e.messages[0].thread_id).shouldBe(threadId);
			valueOf(testRun, e.messages[0].subject).shouldBe('Hello World');
			Cloud.Users.logout(loggedOut);
		};

		var loggedIn = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			Cloud.Messages.showThreads(showResult);
		};

		Cloud.Users.login({
			login:'chatuser',
			password:'password'
		}, loggedIn);
	};

	this.testShowMessagesInThread = function (testRun) {
		var loggedOut = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			finish(testRun);
		};

		var showResult = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.messages.length).shouldBe(1);
			valueOf(testRun, e.messages[0].thread_id).shouldBe(threadId);
			valueOf(testRun, e.messages[0].subject).shouldBe('Hello World');
			valueOf(testRun, e.messages[0].body).shouldBe('This is my reply to your test message');
			valueOf(testRun, e.messages[0].from.id).shouldBe(chatUserId);
			Cloud.Users.logout(loggedOut);
		};

		var loggedIn = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			Cloud.Messages.showThread({
				thread_id:threadId
			}, showResult);
		};

		Cloud.Users.login({
			login:'drillbituser',
			password:'password'
		}, loggedIn);
	};

	this.testDeleteThread = function (testRun) {
		var loggedOut = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			finish(testRun);
		};

		var threadDeleted = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			Cloud.Users.logout(loggedOut);
		};

		var messageCreated = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			valueOf(testRun, e.messages.length).shouldBe(1);
			Cloud.Messages.removeThread({
				thread_id:e.messages[0].thread_id
			}, threadDeleted);
		};

		var loggedIn = function (e) {
			valueOf(testRun, e.success).shouldBeTrue();
			Cloud.Messages.create({
				to_ids:chatUserId,
				subject:'DeleteMe',
				body:'Delete this message thread'
			}, messageCreated)
		};

		Cloud.Users.login({
			login:'drillbituser',
			password:'password'
		}, loggedIn);
	};

	this.testDeleteAllMessagesForDrillbitUser = function (testRun) {
		deleteAllMessagesForUser(testRun, 'drillbituser', 'password');
	};

	this.testDeleteAllMessagesForChatUser = function (testRun) {
		deleteAllMessagesForUser(testRun, 'chatuser', 'password');
	};

	// Populate the array of tests based on the 'hammer' convention
	this.tests = require('hammer').populateTests(this, 30000);
}