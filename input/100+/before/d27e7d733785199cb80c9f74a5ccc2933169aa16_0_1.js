function initFields($form, fieldDefinitions){
    var jQueryFunctions, fieldName, method, args, i,
    fields = [],
    fieldsLength = fieldDefinitions.length;
    
    for(i=0; i < fieldsLength; i++){
      fieldName = fieldDefinitions[i][0];
      jQueryFunctions = fieldDefinitions[i][1];
      
      $form.append(
        '<label for=\"' + fieldName + '\">'+ t10n[fieldName] + '</label>'
      );
      fields[i] = $('<input type=\"text\" class=\"' + fieldName + '\" name=\"' + fieldName + "\">")
        .appendTo($form);
      
      if(jQueryFunctions){
        for(method in jQueryFunctions){
          if(jQueryFunctions.hasOwnProperty(method)){
            args = jQueryFunctions[method];
            fields[i][method](args);
          }
        }
      }
      fields[i].enhanceTextfield({prompt: t10n[fieldName+"Prompt"]});
    }
    return fields;
  }