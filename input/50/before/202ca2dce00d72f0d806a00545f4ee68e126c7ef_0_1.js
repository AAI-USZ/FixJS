function(field) { 
      if (field.id != 'id') {
        html += '<div><strong span="key">' + field.get('label') + '</strong>: ' + record.getFieldValue(field) + '</div>';
      }
    }