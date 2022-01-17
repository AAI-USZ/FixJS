function(startTime) {
  // Make a deep copy.
  var endTime = new Date(Date.parse(startTime.toString()));

  // Assume it's an all-day event if hh=0 & mm=0.
  if (startTime.getHours() === 0 && startTime.getMinutes() === 0) {
    endTime.setDate(startTime.getDate() + 1);
  } else {
    // It's not an all-day event, so default to start + X hours.
    endTime.setHours(startTime.getHours() + common.DEFAULT_DURATION_HOURS_IF_ABSENT);
  }
  return endTime;
}