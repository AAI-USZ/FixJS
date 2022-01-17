function() {
  var videoRecorder = new CordovaVideoRecorder();

  videoRecorder.addEvents({
    onSuccess: upload
  });

  videoRecorder.start();
}