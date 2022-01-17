function(path, msg) {
  builder.selenium2.rcPlayback.post(path, msg, function() {
    builder.selenium2.rcPlayback.recordResult({success: true});
  });
}