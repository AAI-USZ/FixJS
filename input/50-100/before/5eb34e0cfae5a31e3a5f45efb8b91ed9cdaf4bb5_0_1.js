function(error, data) {
      if (error) {
        var msg = "ERROR: "+sys.inspect(error);
        sys.debug(msg)
        response.write("<pre>"+msg+"</pre>", "utf8")
      } else {
        response.write(haml.render(data), "utf8")
      }
      response.end()
    }