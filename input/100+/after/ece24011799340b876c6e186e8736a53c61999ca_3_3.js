function() {
  var videoRecorder = new CordovaVideoRecorder();

  videoRecorder.addEvents({
    success: upload
  });

  videoRecorder.start();
}