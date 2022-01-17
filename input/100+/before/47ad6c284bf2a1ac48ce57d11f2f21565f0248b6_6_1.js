function(i, vevent) {
    var fields = {};

    fields.title = getFirstFieldText(vevent, '.summary');
    fields.description = getFirstFieldText(vevent, '.description');

    // HACK(manas): This is a fix for Facebook, who incorrectly tag their
    // title as "fn" instead of "summary".
    var fn = getFirstFieldText(vevent, '.fn');
    if (fields.title.length > 200 && !isBlankOrUndef(fn)) {
      fields.title = fn;
    }

    fields.start = new Date(Date.parse(
        CalendarUtils.fromIso8601(findDate(vevent, '.dtstart'))));

    var endDate = findDate(vevent, '.dtend');
    if (endDate) {
      fields.end = new Date(Date.parse(CalendarUtils.fromIso8601(endDate)));
    }

    var urlElement = $(vevent).find('.url');
    if (urlElement && urlElement.attr('href')) {
      var hrefAttr = urlElement.attr('href');
      if (hrefAttr.indexOf('http://') == 0 ||
          hrefAttr.indexOf('https://') == 0) {
        // Absolute URL with hostname.
        fields.url = hrefAttr;
      } else if (hrefAttr.indexOf('/') == 0) {
        // Absolute URL without hostname.
        fields.url = window.location.protocol + '//' +
            window.location.host + hrefAttr;
      } else {
        // Relative URL
        fields.url = window.location.href + hrefAttr;
      }
    } else {
      fields.url = window.location.href;
    }

    var maybeAdr = $(vevent).find('adr');
    if (maybeAdr != null) {
      fields.citytown = maybeAdr.find('.locality').text().trim() + ' ' +
          maybeAdr.find('.region').text().trim();
    } else {
      fields.citytown = vevent.find('.location').html()
          .replace(/<[^>]*>/g, ' ').trim();
    }

    var calendarEvent = new CalendarEvent(fields);
    events.push(calendarEvent);

    // Insert a button inline near the title of the page.
    $(vevent).find('.summary').prepend(Renderer.getInlineIconSmall(calendarEvent));
  }