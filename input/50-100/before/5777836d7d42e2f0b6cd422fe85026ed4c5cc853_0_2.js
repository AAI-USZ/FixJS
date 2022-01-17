function(columnName) {
      var self = this;
      var c = this._getColumn(columnName);
      c.destroy({
          success: function() {
            self.fetch();
          },
          wait: true
      });
    }