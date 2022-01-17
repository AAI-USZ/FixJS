function(errorClass, error, options) {
  options = (options === undefined ? {} : options)

  var errorMessage;
  var stacktrace;
  if(typeof error == 'string') {
    errorMessage = error;
    var stack = {}
    Error.captureStackTrace(stack,arguments.callee);
    stacktrace = trace(stack);
  } else {
    stacktrace = trace(error);
    errorMessage = stacktrace.first_line.split(": ")[1]
  }
  
  notifyError(errorClass, errorMessage, stacktrace, getUserIdFromOptions(options), getContextFromOptions(options), getMetaDataFromOptions(options));
}