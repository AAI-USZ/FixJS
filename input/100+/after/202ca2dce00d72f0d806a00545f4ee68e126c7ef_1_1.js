function(record, fields) {
    var start = this._parseDate(record.get(this.state.get('startField')));
    var end = this._parseDate(record.get(this.state.get('endField')));
    if (start) {
      var tlEntry = {
        "startDate": start,
        "endDate": end,
        "headline": String(record.get('title') || ''),
        "text": record.get('description') || this.model.recordSummary(record)
      };
      return tlEntry;
    } else {
      return null;
    }
  }