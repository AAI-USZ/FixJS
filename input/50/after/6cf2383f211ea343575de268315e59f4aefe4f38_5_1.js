function createOptions(req, res, options) {

  // Merge options with helpers
  options = merge(options, req.helpers);

  // Merge options with application data
  if(calipso.data) {
    options = merge(options, calipso.data);
  }

  return options;

}