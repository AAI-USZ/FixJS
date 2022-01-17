function () {
  log.debug("Establishing a connection to the Cloudeo Streaming Server");

//  1. Disable the connect button to avoid a cascade of connect requests
  $('#connectBtn').unbind('click').addClass('disabled');

//  2. Clone the video streaming configuration and create a connection descriptor
//     using settings provided by the user
  var connDescriptor = $.extend({}, CDOT.CONNECTION_CONFIGURATION);
  CDOT.scopeId = $('#scopeIdTxtField').val();
  connDescriptor.url = CDOT.STREAMER_URL_PFX + CDOT.scopeId;
  connDescriptor.token = CDOT.genRandomUserId() + '';
  connDescriptor.autopublishAudio = $('#publishAudioChckbx').is(':checked');
  connDescriptor.autopublishVideo = $('#publishVideoChckbx').is(':checked');

//  3. Define the result handler - delegates the processing to the
//     postConnectHandler
  var onSucc = function () {
    CDOT.postConnectHandler(connDescriptor);
  };

//  4. Define the error handler - enabled the connect button again
  var onErr = function () {
    $('#connectBtn').click(CDOT.connect()).removeClass('disabled');
  };

//  5. Request the SDK to establish a connection
  CDO.getService().connect(CDO.createResponder(onSucc, onErr), connDescriptor);
}