function (req, res) {
            var path = req.params[0],
                url_tmpl = $this.options.document_url_template,
                doc_url = ks_utils.tmpl(url_tmpl, {path: path});

            var req_opts = {
                memcached: $this.memcached,
                timeout: $this.options.cache_timeout || 3600,
                cache_control: req.header('cache-control'),
                url: doc_url,
                statsd: this.statsd
            };
            ks_caching.request(req_opts, function (err, resp, src) {
                $this._evalMacros(src, req, res);
            });
        }