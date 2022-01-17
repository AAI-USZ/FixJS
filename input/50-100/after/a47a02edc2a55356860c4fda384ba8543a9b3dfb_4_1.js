function (e) {
      if (e.code == 'EADDRINUSE') {
        response.json({"error": 'That port is already in use!'});
        response.end();
      }
      else{
        response.json({"error": e.code});
        response.end();
      }
    }