function(columnName, newName) {
      var c = this._getColumn(columnName);
      c.set({
        new_name: newName,
        old_name: c.get('name')
      });
      c.save();
    }