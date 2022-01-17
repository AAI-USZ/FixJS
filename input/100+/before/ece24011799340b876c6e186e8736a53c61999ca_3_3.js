function() {
  recorder = new CordovaAudioRecorder();

  var status = document.getElement('.record_status');
  var time;

  recorder.addEvents({
    onStart: function() {
      time = 0;
      document.getElement('.record_button').hide();
      document.getElement('.stop_record_button').show();
    },

    onSuccess: upload,

    onUpdate: function() {
      status.set('text', (++time) + ' second' + (time == 1 ? '' : 's'));
    },

    onCancel: function() {
      document.getElement('.record_button').show();
      document.getElement('.stop_record_button').hide();
    }

  });

  recorder.start();
}