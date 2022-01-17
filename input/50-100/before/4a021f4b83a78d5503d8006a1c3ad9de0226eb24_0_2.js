function(data) {
    console.log(data.toString());
    if (data.toString().indexOf('listening at port')) {
      serverReady = true;
      if (localReady && serverReady && !curlRunning) {
        return runCurl();
      }
    }
  }