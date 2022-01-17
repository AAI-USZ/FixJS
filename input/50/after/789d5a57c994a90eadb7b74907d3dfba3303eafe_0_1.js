function(e) {
    console.log("Got error: " + e.message);
    callback({cashboard: [], error: e.message});
  }