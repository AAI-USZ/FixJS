function(models, options) {
      this.model.prototype.idAttribute = 'cartodb_id';
      //cdb.admin.CartoDBTableData.prototype.initialize.call(this, models, options);
      this.initOptions();
      if(options && options.sql) {
        this.setSQL(options.sql);
      }
      this.bind('reset', function() {
        console.log("sql reset");
      });
      this.bind('add', function() {
        console.log("sql add");
      });
    }