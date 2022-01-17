function(field) {

    var value = '';

    // Assume the field is in the form "object.field"

    var objectName = field.name && field.name.split('[')[0] || '';

    if(!field.noValue) { // We set this field to a value
    
      if(field.name && field.name.split('[').length > 1) {
  
        var fieldName = field.name.split('[')[1].replace(']', '');
  
        // Check to see if it looks valid
        if(!objectName || !fieldName) {
          calipso.error('Field name incorrect: ' + field.name);
          value = '';
        } else {
  
          if(values && values[objectName]) {
            if(values[objectName][fieldName]) {
              value = values[objectName][fieldName];
            } else {
              try {
                // Use get to get dynamic schema elements (e.g. fields)
                value = values[objectName].get(fieldName);
              } catch(ex) {
                // Do nothing, leave value blank
              }
              if(value === undefined){
                value = '';
              }
            }
          }
          
        }
  
      } else {
        if(values && values[objectName]) {
          value = values[objectName];
        }
      }
      
    } else {
      // Do not set the value 
    }
    
    // field.tag was introduced to allow for <button type="submit"> (without tag:button, that would be <input type="submit">)
    if(self.elementTypes[field.tag || field.type]){
      fieldOutput += self.elementTypes[field.tag || field.type].render(field, value, fieldContainer.tabs);  //self.render_field(field, value);
    } else {
      calipso.warn('no renderer for ', field);
    }

  }