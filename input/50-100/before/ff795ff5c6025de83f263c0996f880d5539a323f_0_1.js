function createCommonErrorResponse(errorCode, message) {
  return '<?xml version="1.0"?>\n' +
         '<Response>' +
           '<Errors>' +
             '<Error><Code>' + errorCode + '</Code>' +
                     '<Message>' + message + '</Message></Error>' +
             '</Errors>' +
           '<RequestID></RequestID>' +
         '</Response>';
}