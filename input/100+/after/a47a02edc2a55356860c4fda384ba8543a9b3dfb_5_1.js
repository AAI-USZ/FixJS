function (e) {
      console.log("UDP error: " + e);
      response.json({"error": false});
    }