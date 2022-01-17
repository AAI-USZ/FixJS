function(key, value, callback) {
  //write this key/value pair to disk and execute callback on completion
  this.data[key] = value;
  // need to prevent duplicates
  if (this.keyList) this.keyList.push(key);
  fs.writeFile(Path.join(this.path, key), JSON.stringify(value), function(err) {
    if (err) throw err;
    console.log('Persisted ' + key);
    callback();
    return this;
  });
}