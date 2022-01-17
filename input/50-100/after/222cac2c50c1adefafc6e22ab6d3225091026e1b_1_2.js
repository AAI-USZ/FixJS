function upload(response, postData, pathname) {

  console.log("Request handler 'upload' was called.");

  response.writeHead(200, {"Content-Type": "text/plain"});

  response.write("You've sent the text: "+

  querystring.parse(postData).text);

  response.end();

}