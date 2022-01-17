function getUrl() {
  if (x = new RegExp('([^?]+)').exec(location.href)) return x[1]
}