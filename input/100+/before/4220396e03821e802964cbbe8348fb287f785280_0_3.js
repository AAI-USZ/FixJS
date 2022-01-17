function(errorClass, error, options) {
  options = (options === undefined ? {} : options)

  var errorMessage;
  if(typeof error == 'string') {
    errorMessage = error;
    error = new Error(error);
  } else {
    errorMessage = stacktrace.first_line.split(": ")[1]
  }
  
  var stacktrace = trace(error);
  notifyError(errorClass, errorMessage, stacktrace, getUserIdFromOptions(options), getContextFromOptions(options), getExtraDataFromOptions(options));
}