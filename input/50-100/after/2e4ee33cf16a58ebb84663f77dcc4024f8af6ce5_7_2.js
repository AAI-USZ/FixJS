function(url) {
        var defer = osgDB.Promise.defer();
        var oReq = new XMLHttpRequest();
        oReq.open("GET", url, true);
        oReq.responseType = "arraybuffer";

        oReq.onload = function (oEvent) {
            var arrayBuffer = oReq.response; // Note: not oReq.responseText
            if (arrayBuffer) {
                // var byteArray = new Uint8Array(arrayBuffer);
                defer.resolve(arrayBuffer);
            }
        };
        oReq.send(null);
        return defer.promise;
    }