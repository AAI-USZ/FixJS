function(models, options) {
      this.model.prototype.idAttribute = 'cartodb_id';
      if(options && options.sql) {
        this.setSQL(options.sql);
      }
    }