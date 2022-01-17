function () {
    var self = this, qobj, qs = "", pool_options;

    if (this.r_val || this.return_body || this.keys) {
        qobj = {};
        if (this.r_val) {
            qobj.r = this.r_val;
        }
        if (this.return_body) {
            qobj.returnbody = this.return_body;
        }
        if (this.keys) {
            qobj.keys = this.keys;
        }
        qs = "?" + querystring.stringify(qobj);
    }

    function on_response(err, res, body) {
        self.on_response(err, res, body);
    }

    pool_options = {
        path: "/buckets/" + encodeURIComponent(this.bucket) + "/keys/" + encodeURIComponent(this.key) + qs,
        headers: this.client.headers(this.options.http_headers),
        retry_not_found: this.should_retry
    };

    if (this.i2) {
      //bucket is bucket
      pool_options.path = "/buckets/" + encodeURIComponent(this.bucket) + "/index/" + this.key + qs;
    }
    console.log(pool_options.path);

    if (this.debug_mode) {
        this.client.log("riak request", "pool options: " + JSON.stringify(pool_options));
    }

    if (this.options.body) {
        this.client.pool[this.method](pool_options, this.options.body, on_response);
    } else {
        this.client.pool[this.method](pool_options, on_response);
    }
}