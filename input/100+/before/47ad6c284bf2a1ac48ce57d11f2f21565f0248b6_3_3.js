function(fromDate, toDate) {
  var now = new Date();
  var niceDate = '';

  // Show the year only if different from the current year.
  if (now.getFullYear() != fromDate.getFullYear()) {
    niceDate = ', ' + fromDate.getFullYear();
  }

  // Append the internationalized name of the month. And date.
  niceDate = chrome.i18n.getMessage('month_' + (fromDate.getMonth() + 1)) +
      ' ' + fromDate.getDate() + niceDate + ' &nbsp; &bull; &nbsp; ';

  // Skip the ":00" if the time is on the hour.
  var hour12hr = fromDate.getHours() % 12;
  hour12hr = (hour12hr == 0) ? 12 : hour12hr;  // If 0, make it 12.

  niceDate += hour12hr +
      ((fromDate.getMinutes() == 0) ? '' : ':' + fromDate.getMinutes()) +
      (fromDate.getHours() >= 12 ? 'pm' : 'am');

  niceDate += ' &mdash; ';

  // If the event ends on the same day, then skip duplicating the date.
  if (!(fromDate.getFullYear() == toDate.getFullYear() &&
        fromDate.getMonth() == toDate.getMonth() &&
        fromDate.getDate() == toDate.getDate())) {
    niceDate += chrome.i18n.getMessage('month_' + (toDate.getMonth() + 1)) +
        ' ' + toDate.getDate();
  }

  // Finally, append the end time, skipping unnecessary ":00" as above.
  niceDate += (toDate.getHours() % 12) +
      ((toDate.getMinutes() == 0) ? '' : ':' + toDate.getMinutes()) +
      (toDate.getHours() >= 12 ? 'pm' : 'am');

  return niceDate;
}