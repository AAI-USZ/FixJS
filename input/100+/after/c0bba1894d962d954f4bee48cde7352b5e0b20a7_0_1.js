function (success, fail, service, action, args) {
        var emulator = {
            "Accelerometer": require('ripple/platform/cordova/1.6/bridge/accelerometer'),
            "Compass": require('ripple/platform/cordova/1.6/bridge/compass'),
            "Contacts": require('ripple/platform/cordova/1.6/bridge/contacts'),
            "Device": require('ripple/platform/cordova/1.6/bridge/device'),
            "Geolocation": require('ripple/platform/cordova/1.6/bridge/geolocation'),
            "Network Status": require('ripple/platform/cordova/1.6/bridge/network'),
            "NetworkStatus": require('ripple/platform/cordova/1.6/bridge/network'),
            "Notification": require('ripple/platform/cordova/1.6/bridge/notification')
        };

        try {
            emulator[service][action](success, fail, args);
        }
        catch (e) {
            console.log("missing exec:" + service + "." + action);
            console.log(args);
            console.log(e);
            console.log(e.stack);
            //TODO: this should really not log the above lines, but they are very nice for development right now
            _prompt.show(service, action, success, fail);
        }
    }