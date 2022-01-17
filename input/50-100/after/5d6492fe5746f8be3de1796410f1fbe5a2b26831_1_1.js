function(file, data, cb) {
  try {
    var result = "module.exports =" + JSON.stringify(JSON.parse(data));
    cb(null, result);
  } catch(err) {
    cb(new Error("Error compiling json: " + data + ", " + err));
  }
}