function (source, cb, cache_hit) {
        var $this = this;
        try {
            var tmpl_cls = $this.options.template_class;
            cb(null, new tmpl_cls({ source: source }), cache_hit);
        } catch (e) {
            cb(e, null, cache_hit);
        }
    }