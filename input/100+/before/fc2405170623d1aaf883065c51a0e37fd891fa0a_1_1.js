function upload(response, request) {
  console.log("Request handler 'upload' was called.");

  var params = '';
  request.on('data', function (data) {
      params += data;
  });
  request.on('end', function () {
	  	console.log("Get the parameters " + params);
      var POST = qs.parse(params);
      console.log("Get the merkItem " + POST.merkItem);
      // save POST.merkItem to db

  });

  response.writeHead(200, {"Content-Type": "text/html"});
  response.write("received item:<br/>");
  response.write(params)
  response.end();
}