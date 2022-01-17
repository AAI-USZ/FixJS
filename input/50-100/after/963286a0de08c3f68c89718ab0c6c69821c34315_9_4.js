function buzzer() {
  if ( currentRecording == -1 && $('#buzzer').hasClass('disabled') ) return;


  if (currentRecording > -1) {
      currentRecording=0;
      stopRecord();
    } else {
        setTimespace(undefined,new Date());
        startRecord(selected_project,selected_activity,userID);
        $('#buzzer').addClass('disabled');
    }
}