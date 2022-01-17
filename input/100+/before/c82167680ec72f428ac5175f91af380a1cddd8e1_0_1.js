function(field, value) {

  if(!value) {
    value = new Date(1900, 0, 1);
  }

  // TODO - use users Locale
  var monthNames = calipso.date.regional[''].monthNamesShort;

  var tagOutput = '<input type="text"'
  + ' class="date date-day' + (field.cls ? ' date-day-'+field.cls : '') + '"'
  + ' name="' + field.name + '[day]"'
  + ' value="' + value.getDate() + '"'
  + this.tagClose;

  tagOutput += ' ';

  tagOutput += '<select class="date date-month' + (field.cls ? ' date-month-'+field.cls : '') + '"'
  + ' name="' + field.name + '[month]">';
  for(var monthNameCounter=0; monthNameCounter<12; monthNameCounter++) {
    tagOutput += (
      '<option value="0"' + (value.getMonth() === monthNameCounter ? ' selected' : '') + '>'
      + monthNames[monthNameCounter]
      + '</option>'
    );

  }
  tagOutput += '</select>';

  tagOutput += ' ';

  tagOutput += '<input type="text"'
  + ' class="date date-year' + (field.cls ? ' date-year-'+field.cls : '') + '"'
  + ' name="' + field.name + '[year]"'
  + ' value="' + value.getFullYear() + '"'
  + this.tagClose;

  return tagOutput;

}