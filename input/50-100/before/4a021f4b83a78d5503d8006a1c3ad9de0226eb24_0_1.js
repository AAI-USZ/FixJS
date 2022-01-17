function(data) {
    console.log(data.toString());
    if (data.toString().indexOf('listening at port')) {
      localReady = true;
      if (localReady && serverReady && !curlRunning) {
        return runCurl();
      }
    }
  }