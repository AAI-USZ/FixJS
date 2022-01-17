function(columnName, newName) {
      var self = this;
      var c = this._getColumn(columnName);
      c.set({
        new_name: newName,
        old_name: c.get('name')
      });
      c.save(null,  {
          success: function() {
            self.fetch();
          },
          error: function() {
            cdb.log.error("can't rename column");
          },
          wait: true
      });
    }