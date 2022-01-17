function (req, res) {
        var $this = this,
            opts = {};

        // Vary caching on values of env vars, as well as X-FireLogger
        var pfx = this.options.env_header_prefix;
        var vary = _.chain(req.headers).keys().filter(function (key) {
            return 0 === key.indexOf(pfx);
        }).value();
        vary.push('X-FireLogger');
        res.header('Vary', vary.join(','));

        // Create a response cache instance
        var cache = new ks_caching.ResponseCache({
            memcache: this.options.memcache
        });
        cache.cacheResponse(req, res, opts, function (req, res) {
            var path = req.params[0],
                url_tmpl = $this.options.document_url_template,
                doc_url = ks_utils.tmpl(url_tmpl, {path: path});

            var req_opts = {
                memcached: $this.memcached,
                timeout: $this.options.cache_timeout || 3600,
                cache_control: req.header('cache-control'),
                url: doc_url
            };
            ks_caching.request(req_opts, function (err, resp, src) {
                $this._evalMacros(src, req, res);
            });
        });
    }