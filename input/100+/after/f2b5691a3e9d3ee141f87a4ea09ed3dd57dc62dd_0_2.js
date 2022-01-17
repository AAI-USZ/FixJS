function(models, options) {
      this.table = options.table;
      this.model.prototype.idAttribute = 'cartodb_id';
      this.initOptions();
      this.linkToSchema();
      this.filter = null;
      this._fetching = false;
    }