function (cfg) {
        var encodeBase64 = function (val) {
            var b64array = "ABCDEFGHIJKLMNOP" +
                               "QRSTUVWXYZabcdef" +
                               "ghijklmnopqrstuv" +
                               "wxyz0123456789+/" +
                               "=";

            input = val;
            var base64 = "";
            var hex = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }

                base64 = base64 +
                            b64array.charAt(enc1) +
                            b64array.charAt(enc2) +
                            b64array.charAt(enc3) +
                            b64array.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);

            return base64;
        }
        if (this.providerConfiguration.user) {
            var user = this.providerConfiguration.user;
            var password = this.providerConfiguration.password;
            var origBeforeSend = cfg.beforeSend;
            cfg.beforeSend = function(xhr) {
                xhr.setRequestHeader("Authorization", "Basic " + encodeBase64(user + ":" + password || ""));
                if (typeof origBeforeSend === "function")
                    origBeforeSend(xhr);
            }
        }
        return cfg;
    }