function (response) {
        var responseBuf = swp.buildMessage(response);
        console.log("response: %s", responseBuf.toString());
        stream.write(responseBuf);
      }