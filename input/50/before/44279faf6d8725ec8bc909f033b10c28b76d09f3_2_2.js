function(suffix) {
  if (suffix) {
    return "http://fimo.s3.amazonaws.com/images/" + this.id + "_" + suffix + ".jpg";
  } else {
    return "http://fimo.s3.amazonaws.com/images/" + this.id + ".jpg";
  }
}