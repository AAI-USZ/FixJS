function(testRun) {
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
    }