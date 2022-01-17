function (oEvent) {
            var arrayBuffer = oReq.response; // Note: not oReq.responseText
            if (arrayBuffer) {
                // var byteArray = new Uint8Array(arrayBuffer);
                if (callback !== undefined) {
                    callback(arrayBuffer);
                }
            }
        }