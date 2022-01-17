function updateRecordStatus(record_ID, record_startTime, customerID, customerName, projectID, projectName, activityID, activityName) {
  startsec = record_startTime;
  if (record_ID == false) {
    // no recording is running anymore
    currentRecording = -1;
    show_selectors();
    return;
  }
  
  buzzer_preselect('project', projectID, projectName, customerID, customerName, false);
  lists_reload('activity', function() {
    buzzer_preselect('activity', activityID, activityName, 0, '', false);
  });
  
}