function(values) {
  if (values == null) {
    return '';
  }
  // BUG 664204: Check for strings with spaces and add quotes
  return values.join(' ');
}