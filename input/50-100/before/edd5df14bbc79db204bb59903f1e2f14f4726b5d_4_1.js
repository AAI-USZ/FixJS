function engine(options) {
      this._inlineInclude = __bind(this._inlineInclude, this);

      this.run = __bind(this.run, this);
      options = options || {};
      this.maxCacheAge = options.maxCacheAge || 2000;
      this.viewCache = {};
      this.lastCacheReset = Date.now();
    }