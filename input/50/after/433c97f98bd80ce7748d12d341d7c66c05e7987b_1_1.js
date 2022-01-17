function(event) {
  if (!windowsVersion())
    self.postMessage(null);
  else {
    var data = JSON.parse(event.data);
    procSnapshot(data[0], data[1]);
  }
}