function(columnName) {
      var self = this;
      var c = this._getColumn(columnName);
      this.notice('deleting column');
      c.destroy({
          success: function() {
            self.fetch();
          },
          error: function () {
            self.error('error deleting column');
          },
          wait: true
      });
    }