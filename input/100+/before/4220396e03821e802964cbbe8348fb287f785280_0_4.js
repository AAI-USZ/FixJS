function(error, options) {
  options = (options === undefined ? {} : options)
  
  if(typeof error == 'string') {
    error = new Error(error);
  }

  var stacktrace = trace(error);
  errorClass = stacktrace.first_line.split(": ")[0];
  errorMessage = stacktrace.first_line.split(": ")[1];
  
  notifyError(errorClass, errorMessage, stacktrace, getUserIdFromOptions(options), getContextFromOptions(options), getExtraDataFromOptions(options));
}