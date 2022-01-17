function updateRecordStatus(record_ID, record_startTime, knd_ID, knd_name, pct_ID, pct_name, evt_ID, evt_name) {
  startsec = record_startTime;
  if (record_ID == false) {
    // no recording is running anymore
    currentRecording = -1;
    show_selectors();
    return;
  }
  
  buzzer_preselect('pct', pct_ID, pct_name, knd_ID, knd_name, false);
  lists_reload('evt', function() {
    buzzer_preselect('evt', evt_ID, evt_name, 0, '', false);
  });
  
}