function wrapException(exception) {
    var error, resultCode;

    if (exception.hasOwnProperty('number')) {
      resultCode = exception.number & 0xffff;
      error = {
        message: 'SQLite Error (Result Code ' + resultCode + ')',
        resultCode: resultCode
      };
    } else {
      error = exception;
    }

    return WinJS.Promise.wrapError(error);
  }