function(event) {
  return [
      '<a style="float: right;" href="',
      event.fields.gcal_url,
      '" title="',
      chrome.i18n.getMessage('add_to_google_calendar'),
      '" target="_blank"><img src="',
      ADD_TO_CALENDAR_BUTTON_URL,
      '"/></a>'
      ].join('');
}