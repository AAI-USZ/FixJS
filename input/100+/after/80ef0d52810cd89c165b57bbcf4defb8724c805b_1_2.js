function( idField, labelField, valueField ){
    var field = $( '<div/>', {
      'class': 'control-group'
    });
    
    var label = $( '<label/>', {
      'class': 'control-label',
      'for': idField,
      html: labelField
    });
    label.appendTo( field );
    
    var input = $( '<div/>', {
      'class': 'controls',
      'for': idField,
      html: $('<input/>', {
        'class': 'input-xlarge focused',
        id: idField,
        type: 'text',
        value: valueField!=null ? valueField : 'Digite algo...'
      })
    });
    input.appendTo( field );
    
    return field;
  }