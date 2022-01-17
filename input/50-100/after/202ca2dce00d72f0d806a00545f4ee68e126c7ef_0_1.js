function(record) {
    var html = '<div class="recline-record-summary">';
    this.fields.each(function(field) { 
      if (field.id != 'id') {
        html += '<div class="' + field.id + '"><strong>' + field.get('label') + '</strong>: ' + record.getFieldValue(field) + '</div>';
      }
    });
    html += '</div>';
    return html;
  }