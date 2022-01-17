function start(response, postData) {

  console.log("Request handler 'start' was called.");



  fs.readFile("./index.html", function (err, content) {

    if (err) {

       throw err; 

      } else {

        response.writeHead(200, {"Content-Type": "text/html"});

        response.write(content);

		response.end();

      }

    });

}