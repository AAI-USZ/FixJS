function(e) {
            // Should be false because push notifications are not configured in the application settings
            valueOf(testRun, e.success).shouldBeFalse();
            valueOf(testRun, e.error).shouldBeTrue();
            Cloud.PushNotifications.unsubscribe({ channel: data.channel, device_token: data.device_token }, unsubscribed);
        }