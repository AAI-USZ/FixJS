function (data, code, url, cb) {
  var reqDataRaw = {};
  reqDataRaw.data = data;
  reqDataRaw.token = code;
  reqDataRaw.target = url;

  var reqData = JSON.stringify(reqDataRaw);
/*
  var request = new XMLHttpRequest();
  request.open('POST', this.getAuthServerURL() + '/commit', true);
  request.setRequestHeader("Content-Type", "application/json");
  
  request.send(reqData);

*/

/*
  $.ajax({
    type: 'POST',
    url: this.getAuthServerURL() + '/commit',
    data: reqData,
    success: cb('success'),
    dataType: cb('failed')
  });
*/

  console.log('Sending data to ' + this.getAuthServerURL() + '/commit');
  $.post(this.getAuthServerURL() + '/commit', reqData,
    function(data) {
      console.log('API retrieved ');
      console.log(data);
      cb('failed'); // Just for debugging of course
    }, 
    "json"
  );
}