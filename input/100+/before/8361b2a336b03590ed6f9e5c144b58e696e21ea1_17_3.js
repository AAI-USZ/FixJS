function() {
    var finish;
    var valueOf;
    var Cloud;
    this.init = function(testUtils) {
        finish = testUtils.finish;
        valueOf = testUtils.valueOf;
        Cloud = require('ti.cloud');
    };

    this.name = "cloud push notifications";
    this.tests = [
        {name: "Api"},
        {name: "LoginDrillbitUser", timeout: 30000 },
        {name: "Notify", timeout: 30000 },
        {name: "LogoutDrillbitUser", timeout: 30000 }
    ];

    function verifyAPIs(testRun, namespace, functions) {
        for (var i = 0; i < functions.length; i++) {
            valueOf(testRun, Cloud[namespace][functions[i]]).shouldBeFunction();
        }
    };

    var drillbitUserId;

    // ---------------------------------------------------------------
    // Cloud.PushNotifications
    // ---------------------------------------------------------------

    // Test that all of the namespace APIs are available
    this.Api= function(testRun) {
        // Verify that all of the methods are exposed
        verifyAPIs(testRun, 'PushNotifications', [
            'subscribe',
            'unsubscribe',
            'notify'
        ]);
        finish(testRun);
    },

    // Log in for the following tests
    this.LoginDrillbitUser = function(testRun) {
        var data = {
            login: 'drillbitUser',
            password: 'password'
        };
        Cloud.Users.login(data, function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            valueOf(testRun, e.error).shouldBeFalse();
            drillbitUserId = e.users[0].id;
            finish(testRun);
        });
    },

    // Register for push notifications
    this.Notify = function(testRun) {
        var data = {
            channel: 'test',
            device_token: "not-a-real-token",
            type: Ti.Platform.name === 'iPhone OS' ? 'ios' : Ti.Platform.name
        };

        var subscribed = function(e) {
            // Should be false because push notifications are not configured in the application settings
            valueOf(testRun, e.success).shouldBeFalse();
            valueOf(testRun, e.error).shouldBeTrue();
            Cloud.PushNotifications.notify({ channel: data.channel, payload: 'Hello World' }, notified);
        };

        var notified = function(e) {
            // Should be false because push notifications are not configured in the application settings
            valueOf(testRun, e.success).shouldBeFalse();
            valueOf(testRun, e.error).shouldBeTrue();
            Cloud.PushNotifications.unsubscribe({ channel: data.channel, device_token: data.device_token }, unsubscribed);
        }

        var unsubscribed = function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            valueOf(testRun, e.error).shouldBeFalse();
            finish(testRun);
        };

        Cloud.PushNotifications.subscribe(data, subscribed);
    },

    // Done with the tests -- log out
    this.LogoutDrillbitUser = function(testRun) {
        Cloud.Users.logout(function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            valueOf(testRun, e.error).shouldBeFalse();
            finish(testRun);
        });
    }
}