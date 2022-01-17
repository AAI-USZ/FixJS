function(code){
  var err = new Error(http.STATUS_CODES[code]);
  err.status = code;
  return err;
}