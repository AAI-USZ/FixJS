function(element, selector) {
  var rawField = $(element).find(selector);
  if (rawField && rawField.length > 0) {
    return $(rawField[0]).text().trim();
  }
  return '';
}