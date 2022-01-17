function buzzer() {
  if ( currentRecording == -1 && $('#buzzer').hasClass('disabled') ) return;


  if (currentRecording > -1) {
      currentRecording=0;
      stopRecord();
    } else {
        setTimespace(undefined,new Date());
        startRecord(selected_pct,selected_evt,usr_ID);
        $('#buzzer').addClass('disabled');
    }
}