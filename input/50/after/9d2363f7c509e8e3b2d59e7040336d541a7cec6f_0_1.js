function(field) {
      return {
        field: field.id,
        value: self._cellRenderer(doc.get(field.id), field, doc)
      }
    }