function(error, options) {
  options = (options === undefined ? {} : options)
  
  var errorClass;
  var errorMessage;
  var stacktrace;
  
  if(typeof error == 'string') {
    errorClass = "Error";
    errorMessage = error;
    var stack = {}
    Error.captureStackTrace(stack,arguments.callee);
    stacktrace = trace(stack);
  } else {
    stacktrace = trace(error);
    errorClass = stacktrace.first_line.split(": ")[0];
    errorMessage = stacktrace.first_line.split(": ")[1]
  }
  
  notifyError(errorClass, errorMessage, stacktrace, getUserIdFromOptions(options), getContextFromOptions(options), getMetaDataFromOptions(options));
}