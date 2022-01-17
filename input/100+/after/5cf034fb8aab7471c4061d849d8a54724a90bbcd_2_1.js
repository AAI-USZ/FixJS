function (data, code, url, cb) {
  var reqDataRaw = {};
  reqDataRaw.data = data;
  reqDataRaw.token = code;
  reqDataRaw.target = url;

  var reqData = JSON.stringify(reqDataRaw);

  var request = new XMLHttpRequest();
  request.open('POST', this.getAuthServerURL() + '/commit', true);
  request.send(reqDataRaw);

  request.onloadend = function () {
    console.log(request.responseText);
    if(JSON.parse(request.responseText).result == 'success') {
      cb('success');
    } else {
      cb('failed');
    }
  }
}