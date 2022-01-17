function() {
      var sql = this.$('textarea').val();
      this.sqlView.setSQL(sql);
      this.model.useSQLView(this.sqlView);
      this.sqlView.fetch({
        error: function(e) {
          console.log(e);
        }
      });
      //this.trigger('sqlQuery', sql);
    }