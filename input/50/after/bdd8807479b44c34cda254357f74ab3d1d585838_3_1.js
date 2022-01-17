function (self, err) {
  if (err) {
    this.error = err;
  } else {
    this.size = fs.statSync(this.tmp_name).size;
  }
  --self.i || self.callback();
}