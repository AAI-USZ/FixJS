function(conf) {
      var inputType, item, options, slug, urlpath, _i, _len, _ref, _results;
      if (conf == null) conf = this.options.conf;
      if (!(conf && path.existsSync(conf))) return;
      slug = JSON.parse(fs.readFileSync(conf, 'utf-8'));
      if (!slug.hasOwnProperty("/")) {
        throw "Root path '/' not specified in config";
      } else {
        this.options.docroot = path.join(path.dirname(path.resolve(conf)), slug["/"]);
      }
      this.options.js = {};
      this.options.css = {};
      this.options.static = {};
      _results = [];
      for (urlpath in slug) {
        options = slug[urlpath];
        if (0 <= ["conf", "port"].indexOf(urlpath)) continue;
        if ("/" !== urlpath.charAt(0)) {
          this.logger.warn("Skipping " + urlpath + ", must start with /");
          continue;
        }
        switch (path.extname(urlpath)) {
          case ".js":
            item = {
              id: urlpath,
              build: this.options.docroot + urlpath,
              minify: true,
              dependency: [],
              lib: [],
              module: []
            };
            if (Array.isArray(options)) {
              item.module = options;
            } else if ("object" === typeof options) {
              if (!(options.input != null)) {
                this.logger.warn("Skipping " + urlpath + ", no inputs found");
                continue;
              }
              if (options.minify != null) item.minify = options.minify;
              if (Array.isArray(options.input)) {
                options.input = {
                  module: options.input
                };
              }
              _ref = ["dependency", "lib", "module"];
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                inputType = _ref[_i];
                if (options.input[inputType]) {
                  item[inputType] = options.input[inputType];
                }
              }
              if (options.build != null) item.build = path.resolve(options.build);
            } else {
              this.logger.warn("Skipping " + urlpath + ", unable to parse options");
              continue;
            }
            this.options.js[urlpath] = item;
            _results.push(this.logger.info("JS: " + urlpath));
            break;
          case ".css":
            item = {
              id: urlpath,
              build: this.options.docroot + urlpath,
              minify: true,
              input: options
            };
            if (!Array.isArray(options) && "object" === typeof options) {
              if (!(options.input != null) || !Array.isArray(options.input)) {
                this.logger.warn("Skipping " + urlpath + ", no inputs found");
                continue;
              }
              if (options.minify != null) item.minify = options.minify;
              if (options.build != null) item.build = options.build;
              item.input = options.input;
            }
            this.options.css[urlpath] = item;
            _results.push(this.logger.info("CSS: " + urlpath));
            break;
          default:
            if ("/" !== urlpath) {
              _results.push(this.logger.warn("Unrecognized path type: " + urlpath));
            } else {
              _results.push(void 0);
            }
        }
      }
      return _results;
    }