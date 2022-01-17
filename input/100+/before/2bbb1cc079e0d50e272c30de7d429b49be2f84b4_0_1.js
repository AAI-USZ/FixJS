function(success, fail) {
       var Connection = require("cordova/plugin/Connection");
       var connectionType = Connection.NONE;
       deviceapis.devicestatus.getPropertyValue(function(value) {
               //console.log("Device WiFi network status: "+value);
               if(value == "connected") {
                   connectionType = Connection.WIFI;
               }
               channel.onCordovaConnectionReady.fire();
               success(connectionType);
           },
           function(error) {
                console.log(JSON.stringify(error));
                fail();
           } , {aspect: "WiFiNetwork", property: "networkStatus"}
       );
        //info.getPropertyValue(function(value) {
        //console.log("Device Cellular network status: "+value);
        //if(signalStrength > 10) {
        //self.type = Connection.CELL_3G;
        //}
        //}, fail, {aspect: "CellularNetwork", property: "signalStrength"});
    }