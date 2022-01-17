function () {
//  Clone the video streaming configuration and create a connection descriptor
//  using settings provided by the user
  var connDescriptor = $.extend({}, CDOT.CONNECTION_CONFIGURATION);
  connDescriptor.url = CDOT.STREAMER_URL_PFX + CDOT.scopeId;
  connDescriptor.token = CDOT.userId + '';
  connDescriptor.autopublishAudio = $('#publishAudioChckbx').is(':checked');
  connDescriptor.autopublishVideo = $('#publishVideoChckbx').is(':checked');
}