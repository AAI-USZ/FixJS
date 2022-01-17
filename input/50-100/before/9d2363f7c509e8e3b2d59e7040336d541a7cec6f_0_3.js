function() {
    var doc = this.model;
    var cellData = this._fields.map(function(field) {
      return {field: field.id, value: doc.get(field.id)}
    })
    return { id: this.id, cells: cellData }
  }