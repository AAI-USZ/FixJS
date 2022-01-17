function() {
    var self = this;
    var doc = this.model;
    var cellData = this._fields.map(function(field) {
      return {
        field: field.id,
        value: self._cellRenderer(doc.get(field.id), field, doc)
      }
    })
    return { id: this.id, cells: cellData }
  }