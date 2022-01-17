function(field, value, bare){
  var isCheckable = field.type == 'radio' || field.type == 'checkbox';
  var checked = field.checked || (isCheckable && value && (field.value == value || value===true));
  
  //console.log('... field: ', field, value);
  
  var tagOutput = '<input type="' + field.type + '"'
  + ' class="'+ field.type + (field.cls ? ' ' + field.cls : "") + (field.labelFirst ? ' labelFirst' : '') + '"'
  + ' name="' + field.name + '"'
  + ' id="' + field.name + (field.type=='radio' ? (++f.radioCount) : '') + '"'
  + (field.src ? ' src="' + field.src + '"' : '') // for input type=image .. which should be avoided anyway.
  + ' value="' + (value || field.value || (isCheckable && 'on') || '') + '"'
  + (field.readonly || field.disabled ? ' disabled' : '')
  + (checked ? ' checked' : '')
  + f.tagClose;
  if(field.readonly || field.disabled){
    // Workaround for readonly/disabled fields (esp. checkboxes/radios) - add a hidden field with the value
    tagOutput += '<input type="hidden" name="' + field.name + '" value="' + (checked ? 'on' : 'off') + '" />';
  }
  return bare ? tagOutput : me.decorateField(field, tagOutput);
}