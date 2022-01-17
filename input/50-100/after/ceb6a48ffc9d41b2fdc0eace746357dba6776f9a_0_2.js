function (data) {
        var lines = data.toString().split('\n');
        var devices = [];

        for (var i=0; i<lines.length; i++) {
            var o = lines[i].split('\t');

            if (o.length == 2) {
                devices.push(new AndroidDevice(adb, o[0], o[1]));
            }
        }

        callback(devices);
    }