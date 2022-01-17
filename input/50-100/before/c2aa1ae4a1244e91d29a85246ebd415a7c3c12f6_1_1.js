function(key, value, callback) {
  //write this key/value pair to disk and execute callback on completion
  this.data[key] = value;
  if (this.keyList) this.keyList.push(key);
  fs.writeFile(Path.join(this.path, key), value, function(err) {
    if (err) throw err;
    console.log('Persisted ' + key);
    callback();
    return this;
  });
}