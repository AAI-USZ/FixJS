function(relativeUrl) {
  var url = this.fixturesPath.match('/$') ? this.fixturesPath + relativeUrl : this.fixturesPath + '/' + relativeUrl;
  var request = new XMLHttpRequest();
  request.open("GET", url + "?" + new Date().getTime(), false);
  request.send(null);
  this.fixturesCache_[relativeUrl] = request.responseText;
}