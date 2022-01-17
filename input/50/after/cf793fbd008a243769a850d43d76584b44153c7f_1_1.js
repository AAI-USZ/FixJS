function(code, callback, filename, error){
  try {
    LiveScript.run(code, {
      filename: filename
    });
  } catch (e) {
    error = e;
  }
  return callback(error);
}