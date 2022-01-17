function (err, data) {
    if (err) {
	  console.log(err);
      if (err.errno == 34) {
        callback(null);
        return this;
      } else {
        throw err;
      }
    }
    this.data[key] = JSON.parse(data);
    console.log(key + ' loaded off disk');
    console.log(this.data[key]);
    callback(this.data[key]);
  }