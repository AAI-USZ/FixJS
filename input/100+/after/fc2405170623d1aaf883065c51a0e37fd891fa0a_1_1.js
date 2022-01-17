function upload(response, request) {
  console.log("Request handler 'upload' was called.");

  var url = url.parse(request.url, true);
  
  var msg = url.query.merkItem;
  var user = url.query.user;
  
  console.log("Get the merkItem " + msg);
  
  db.saveMerkItem(msg, "marian");


  response.writeHead(200, {"Content-Type": "text/html"});
  response.write("received item:<br/>");
  response.write(params)
  response.end();
}