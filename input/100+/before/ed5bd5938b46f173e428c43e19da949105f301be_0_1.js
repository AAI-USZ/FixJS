function Get(options) {
    // Allow calling without new keyword.
    if (!(this instanceof Get)) {
        return new Get(options);
    }

    if (typeof options == 'string') {
        this.uri = options;
        this.headers = default_headers;
        if (process.env.HTTP_PROXY) {
            this.proxy = url.parse(process.env.HTTP_PROXY);
            this.headers['proxy-authorization'] =
                'Basic ' + new Buffer(this.proxy.auth).toString('base64');
        } else {
            this.proxy = {};
        }
    } else {
        if (!options.uri) {
            throw Error('uri option required in get constructor');
        }
        this.uri = options.uri;
        this.max_redirs = options.max_redirs || 10;
        this.max_length = options.max_length || 0;
        this.encoding = options.encoding;
        this.headers = options.headers || default_headers;
        this.timeout = 'timeout' in options ? options.timeout : 10000;
        if (!this.no_proxy && process.env.HTTP_PROXY) {
            this.proxy = url.parse(process.env.HTTP_PROXY);
            this.headers['proxy-authorization'] =
                'Basic ' + new Buffer(this.proxy.auth).toString('base64');
        } else {
            this.proxy = {};
        }
    }
}