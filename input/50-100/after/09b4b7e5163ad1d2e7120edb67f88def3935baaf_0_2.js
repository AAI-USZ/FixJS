function(data) {
    console.log(data.toString());
    if (data.toString().indexOf('listening at port' >= 0)) {
      serverReady = true;
      if (localReady && serverReady && !curlRunning) {
        return runCurl();
      }
    }
  }