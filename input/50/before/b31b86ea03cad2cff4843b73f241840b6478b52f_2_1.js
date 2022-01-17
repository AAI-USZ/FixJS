function (response) {
        var responseText = swp.buildMessage(response);
        console.log("response: %s", responseText);
        stream.write(responseText);
      }