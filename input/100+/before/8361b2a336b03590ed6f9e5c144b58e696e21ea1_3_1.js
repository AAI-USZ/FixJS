function() {
    var finish;
    var valueOf;
    var Cloud;
    this.init = function(testUtils) {
        finish = testUtils.finish;
        valueOf = testUtils.valueOf;
        Cloud = require('ti.cloud');
    };

    this.name = "cloud chats";
    this.tests = [
        {name: "Api"},
        {name: "Create", timeout: 30000},
        {name: "Query", timeout: 30000},
        {name: "MOD752", timeout: 30000},
        {name: "GetChatGroups", timeout: 30000}
    ];

    function verifyAPIs(testRun, namespace, functions) {
        for (var i = 0; i < functions.length; i++) {
            valueOf(testRun, Cloud[namespace][functions[i]]).shouldBeFunction();
        }
    };

    var drillbitUserId;
    var chatUserId;
    var groupId;

    // ---------------------------------------------------------------
    // Cloud.Chats
    // ---------------------------------------------------------------

    // Test that all of the namespace APIs are available
    this.Api = function(testRun) {
        // Verify that all of the methods are exposed
        verifyAPIs(testRun, 'Chats', [
            'create',
            'query',
            'getChatGroups'
        ]);
        finish(testRun);
    },

    this.Create = function(testRun) {
        var chatUserLoggedIn = function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            chatUserId = e.users[0].id;
            Cloud.Users.logout(chatUserLoggedOut);
        };

        var chatUserLoggedOut = function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            Cloud.Users.login({ login: 'drillbitUser', password: 'password'}, drillbitUserLoggedIn);
        };

        var drillbitUserLoggedIn = function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            drillbitUserId = e.users[0].id;
            Cloud.Chats.create({ to_ids: chatUserId, message: 'Hello'}, chatCreated);
        };

        var chatCreated = function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            valueOf(testRun, e.chats.length).shouldBe(1);
            valueOf(testRun, e.chats[0].message).shouldBe('Hello');
            valueOf(testRun, e.chats[0].from.id).shouldBe(drillbitUserId);
            valueOf(testRun, e.chats[0].chat_group.participate_users.length).shouldBe(2);
            groupId = e.chats[0].chat_group.id;
            Cloud.Users.logout(finished);
        };

        var finished = function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            finish(testRun);
        };

        // Get the userId of the chat user
        Cloud.Users.login({ login: 'chatuser', password: 'password'}, chatUserLoggedIn);
    },

    this.Query= function(testRun) {
        var chatUserLoggedIn = function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            chatUserId = e.users[0].id;
            // Get last message
            Cloud.Chats.query({
                chat_group_id: groupId,
                order: '-created_at',
                page: 1,
                per_page: 1
            }, queryResult1);
        };

        var queryResult1 = function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            valueOf(testRun, e.chats.length).shouldBe(1);
            valueOf(testRun, e.chats[0].message).shouldBe('Hello');
            valueOf(testRun, e.chats[0].from.id).shouldBe(drillbitUserId);
            valueOf(testRun, e.chats[0].chat_group.participate_users.length).shouldBe(2);
            valueOf(testRun, e.chats[0].chat_group.id).shouldBe(groupId);
            // NOTE: If the two chat messages are created too closely together then they can
            // get the same timestamp and when we retrieve them the order is indeterminate. So,
            // for testing we insert a slight delay so that the timestamps of the 2 messages
            // are spaced enough to make the retrieval by creation time determinate.
            setTimeout(delay, 200);
        };

        var delay = function(e) {
            Cloud.Chats.create({ chat_group_id: groupId, message: 'World'}, chatCreated);
        }

        var chatCreated = function(e) {
             valueOf(testRun, e.success).shouldBeTrue();
             valueOf(testRun, e.chats.length).shouldBe(1);
             valueOf(testRun, e.chats[0].message).shouldBe('World');
             valueOf(testRun, e.chats[0].from.id).shouldBe(chatUserId);
             valueOf(testRun, e.chats[0].chat_group.participate_users.length).shouldBe(2);
             Cloud.Users.logout(chatUserLoggedOut);
        };

        var chatUserLoggedOut = function(e) {
             valueOf(testRun, e.success).shouldBeTrue();
             Cloud.Users.login({ login: 'drillbituser', password: 'password'}, drillbitUserLoggedIn);
        };

        var drillbitUserLoggedIn = function(e) {
             valueOf(testRun, e.success).shouldBeTrue();
             drillbitUserId = e.users[0].id;
             Cloud.Chats.query({
                chat_group_id: groupId,
                order: '-created_at',
                page: 1,
                per_page: 2
            }, queryResult2);
        };

        var queryResult2 = function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            valueOf(testRun, e.chats.length).shouldBe(2);
            valueOf(testRun, e.chats[0].message).shouldBe('World');
            valueOf(testRun, e.chats[1].message).shouldBe('Hello');
            valueOf(testRun, e.chats[0].from.id).shouldBe(chatUserId);
            valueOf(testRun, e.chats[1].from.id).shouldBe(drillbitUserId);
            valueOf(testRun, e.chats[0].chat_group.participate_users.length).shouldBe(2);
            valueOf(testRun, e.chats[1].chat_group.participate_users.length).shouldBe(2);
            valueOf(testRun, e.chats[0].chat_group.id).shouldBe(groupId);
            valueOf(testRun, e.chats[1].chat_group.id).shouldBe(groupId);
            Cloud.Users.logout(finished);
        };

        var finished = function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            finish(testRun);
        };

        Cloud.Users.login({ login: 'chatuser', password: 'password'}, chatUserLoggedIn);
    },

    this.MOD752 = function(testRun) {
        var chatUserLoggedIn = function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            chatUserId = e.users[0].id;
            Cloud.Chats.query({
                chat_group_id: groupId,
                where: { updated_at: { '$gt': '2020-05-28T12:50:00+0000' } }
            }, queryResult);
        };

        var queryResult = function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            valueOf(testRun, e.chats.length).shouldBe(0);
            Cloud.Users.logout(finished);
        };

        var finished = function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            finish(testRun);
        };

        Cloud.Users.login({ login: 'chatuser', password: 'password'}, chatUserLoggedIn);
    },

    this.GetChatGroups = function(testRun) {
        var chatUserLoggedIn = function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            Cloud.Chats.getChatGroups({
                order: '-created_at'
            }, chatGroupsRetrieved);
        };

        var chatGroupsRetrieved = function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            valueOf(testRun, e.chat_groups.length).shouldBe(1);
            valueOf(testRun, e.chat_groups[0].participate_users.length).shouldBe(2);
            Cloud.Users.logout(finished);
        };

        var finished = function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            finish(testRun);
        };

        Cloud.Users.login({ login: 'chatuser', password: 'password'}, chatUserLoggedIn);
    }
}