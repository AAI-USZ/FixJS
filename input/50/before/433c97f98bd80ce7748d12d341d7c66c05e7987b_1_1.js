function(event) {
  if (!windowsVersion())
    self.postMessage(null);
  else
    procSnapshot(event.data[0], event.data[1]);
}