function(pathToPPS, callback, options) {
        var ppsData = {},
            result;
            
        try {
            self.init();
            if (self.open(pathToPPS, "0", options)) {
                result = self.read();
                if (result) {
                    ppsData = result;
                }
            }
        } finally {
            self.close();
        }
        
        callback(ppsData);
    }