function(columnName, newName) {
      var self = this;
      var c = this._getColumn(columnName);
      c.set({
        new_name: newName,
        old_name: c.get('name')
      });
      this.notice('renaming column');
      c.save(null,  {
          success: function() {
            self.fetch();
          },
          error: function(e, resp) {
            cdb.log.error("can't rename column");
            self.error('error renaming column', resp);
          },
          wait: true
      });
    }