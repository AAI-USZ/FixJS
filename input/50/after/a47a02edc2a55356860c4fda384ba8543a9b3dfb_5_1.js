function () {
      var address = serverUdp.address();
      socketOpen = true;
      response.json({"error": false});
    }