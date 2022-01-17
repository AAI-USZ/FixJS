function(columnName, newType) {
      var self = this;
      var c = this._getColumn(columnName);
      c.set({ type: newType});
      this.notice('changing column type');
      c.save(null, {
          success: function() {
            self.fetch();
          },
          error: function() {
            self.error('error chaging column ttype');
          },
          wait: true
      });
    }