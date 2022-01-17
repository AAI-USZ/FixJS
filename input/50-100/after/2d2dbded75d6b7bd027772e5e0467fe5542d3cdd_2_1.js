function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("[INFO] Request for " + pathname + " received.");

    route(handle, pathname);

    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
  }