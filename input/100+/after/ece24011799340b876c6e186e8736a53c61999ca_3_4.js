function() {
  var recordings = LocalStorage.get('recordings') || [];

  recorder = new CordovaAudioRecorder('mobile-recording-' + (recordings.length + 1));

  var status = document.getElement('.record_status');
  var time;

  recorder.addEvents({
    start: function() {
      time = 0;
      document.getElement('.record_button').hide();
      document.getElement('.stop_record_button').show();
    },

    success: upload,

    update: function() {
      status.set('text', (++time) + ' second' + (time == 1 ? '' : 's'));
    },

    cancel: function() {
      document.getElement('.record_button').show();
      document.getElement('.stop_record_button').hide();
    }

  });

  recorder.start();
}