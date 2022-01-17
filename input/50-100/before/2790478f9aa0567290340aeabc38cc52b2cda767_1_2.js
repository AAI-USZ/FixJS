function (source, cb) {
        var $this = this;
        try {
            var tmpl_cls = $this.options.template_class;
            cb(null, new tmpl_cls({ source: source }));
        } catch (e) {
            cb(e, null);
        }
    }