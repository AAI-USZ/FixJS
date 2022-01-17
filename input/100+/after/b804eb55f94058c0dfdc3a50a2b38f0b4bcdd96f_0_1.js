function (data, code, url, cb) {
  var reqDataRaw = {};
  reqDataRaw.data = data;
  reqDataRaw.token = code;
  reqDataRaw.target = url;

  console.log('Sending data to ' + this.getAuthServerURL() + '/commit');
  
  var self = this;
  var url = 'https://api.github.com/repos/' + url.split('/')[3] + '/' + url.split('/')[4] + '/git/refs/heads/' + url.split('/')[5];
  jQuery.getJSON(url + "?callback=?", {}, function(response) {
    reqDataRaw.tree = response.data.object.sha;
    var reqData = JSON.stringify(reqDataRaw);

    var request = new XMLHttpRequest();
    request.open('POST', self.getAuthServerURL() + '/commit', true);
    request.setRequestHeader("Content-Type", "application/json");
  
    request.send(reqData);

    request.onloadend = function () {
      console.log(request.statusCode);
      if(request.status == 500) {
        cb('failed');
      } else {
        cb('success');
      }
    }
  });
}