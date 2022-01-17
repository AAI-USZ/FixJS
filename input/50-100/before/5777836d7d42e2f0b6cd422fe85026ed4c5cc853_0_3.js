function(columnName, newType) {
      var self = this;
      var c = this._getColumn(columnName);
      c.set({ type: newType});
      c.save(null, {
          success: function() {
            self.fetch();
          },
          wait: true
      });
    }