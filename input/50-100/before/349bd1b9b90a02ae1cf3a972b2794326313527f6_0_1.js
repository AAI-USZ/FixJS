function wrapComException(comException) {
    var resultCode = comException.number & 0xffff;

    return WinJS.Promise.wrapError({
      message: 'SQLite Error (Result Code ' + resultCode + ')',
      resultCode: resultCode
    });
  }