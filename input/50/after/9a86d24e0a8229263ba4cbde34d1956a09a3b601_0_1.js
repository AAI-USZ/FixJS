function(value) {
  if (value == null) {
    return '';
  }
  return value.__gcliQuery || 'Error';
}