function (options) {

    var self = this;

    this.options = options || {};
    this.app_id = this.options.app_id;
    this.secret = this.options.secret;

    this.middleware = function () {
        return function (req, res, next) {
            if (req.cookies["fbsr_" + self.app_id]) {
                req.facebook = self.parse_signed_request(req.cookies["fbsr_" + self.app_id]);
                if(req.facebook) {
                    req.authenticated = true;
                }
            }
            next();
        }
    }

    this.parse_signed_request = function (signed_request) {
        // Prepare cookie data
        var encoded_data = signed_request.split('.', 2);
        var signature = encoded_data[0];
        var json = b64url.decode(encoded_data[1]);
        var data = JSON.parse(json);

        // Check algorithm
        if (!data.algorithm || (data.algorithm.toUpperCase() != 'HMAC-SHA256')) {
            throw("Unknown algorithm. Expected HMAC-SHA256");
        }

        // Check signature of the cookie
        var secret = self.secret;
        var expected_sig = crypto.createHmac('sha256', secret).update(encoded_data[1]).digest('base64').replace(/\+/g, '-').replace(/\//g, '_').replace('=', '');
        if (sig !== expected_sig) {
            throw("Bad signature. The cookie isn't signed with the app secret");
        }

        // Check the user status
        if (!data.user_id) {
            // Not logged in or not authorized
            return;
        } else {
            return data;
        }
    }
}