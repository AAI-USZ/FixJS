function() {
  // Basic event information: Title, Start, End.
  var link =
      'https://www.google.com/calendar/event?action=TEMPLATE&trp=false&text=' +
      encodeURIComponent(this.fields.title);

  // Dates could be optional.
  if (!isBlankOrUndef(this.fields.start)) {
    link += '&dates=' + CalendarUtils.getDateGoogleCalendar(this.fields.start);

    // Even if start date is present, end date could be missing.
    if (!isBlankOrUndef(this.fields.end)) {
      link += '/' + CalendarUtils.getDateGoogleCalendar(this.fields.end);
    }
  }

  // Location
  link += '&location=' + this.getFormattedLocation_();

  // URL
  if (!isBlankOrUndef(this.fields.url)) {
    link += '&sprop=' + encodeURIComponent(this.fields.url)
        + '&sprop=name:' + encodeURIComponent(this.fields.title);
  }

  // Details
  link += '&details=';
  if (!isBlankOrUndef(this.fields.description)) {
    link += encodeURIComponent(this.fields.description + "\n\n");
  }
  link += chrome.i18n.getMessage('read_more_at_original_url') +
      encodeURIComponent(this.fields.url);

  return link;
}