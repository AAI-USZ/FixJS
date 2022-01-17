function(success, fail) {
        var connectionType = Connection.NONE;
        var networkInfo = ["cellular", "wifi"]; // might be a better way to do this
        var gotConnectionInfo = function() {
            networkInfo.pop();
            if(networkInfo.length === 0) {
                channel.onCordovaConnectionReady.fire();
                success(connectionType);
            }
        };
        var error = function(e) {
            console.log("Error "+e.message);
            gotConnectionInfo();
        };
        deviceapis.devicestatus.getPropertyValue(function(value) {
            console.log("Device Cellular network status: "+value);
            if(connectionType === Connection.NONE) {
                connectionType = Connection.CELL_2G;
            }
            gotConnectionInfo();
        }, error, {aspect: "CellularNetwork", property: "signalStrength"});

        deviceapis.devicestatus.getPropertyValue(function(value) {
            console.log("Device WiFi network status: "+value);
            if(value == "connected") {
                connectionType = Connection.WIFI;
            }
            gotConnectionInfo();
        }, error, {aspect: "WiFiNetwork", property: "networkStatus"});
    }