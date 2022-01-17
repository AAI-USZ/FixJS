function createOptions(req, res, options) {

  // Merge options with helpers
  options = merge(options, calipso.helpers);

  // Merge options with application data
  if(calipso.data) {
    options = merge(options, calipso.data);
  }

  return options;

}