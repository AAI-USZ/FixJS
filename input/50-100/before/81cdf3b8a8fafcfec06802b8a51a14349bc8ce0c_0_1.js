function() {
      var sql = this.$('textarea').val();
      this.sqlView.setSQL(sql);
      this.model.useSQLView(this.sqlView);
      this.sqlView.fetch();
      //this.trigger('sqlQuery', sql);
    }