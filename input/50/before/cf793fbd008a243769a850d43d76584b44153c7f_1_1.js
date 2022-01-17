function(code, callback, filename, error){
  var error;
  try {
    LiveScript.run(code, {
      filename: filename
    });
  } catch (e) {
    error = e;
  }
  return callback(error);
}