function(e) {
    console.log("Got error: " + e.message);
    callback({redmine: [], error: e.message});
  }