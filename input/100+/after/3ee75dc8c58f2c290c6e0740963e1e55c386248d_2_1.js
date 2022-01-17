function(data) {
    var calendars = [];
    // See the raw feed to understand this parsing.
    $(data).find('entry').each(function() {
      var entry = $(this);

      var calendar = {
        title: entry.find('title').text(),
        url: entry.find('content').attr('src'),
        color: entry.find('color').attr('value')
      };

      // If a calendar is selected, and not hidden, add it to our list.
      if (entry.find('hidden').attr('value') == 'false' &&
          entry.find('selected').attr('value') == 'true') {
        calendars.push(calendar);
      }
    });
    callback(calendars);

  }