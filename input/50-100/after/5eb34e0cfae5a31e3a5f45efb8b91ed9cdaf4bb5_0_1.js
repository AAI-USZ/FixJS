function(error, data) {
      if (error) {
        var msg = "ERROR: "+util.inspect(error);
        util.debug(msg)
        response.write("<pre>"+msg+"</pre>", "utf8")
      } else {
        response.write(haml.render(data), "utf8")
      }
      response.end()
    }