function(i, row) {
    var fieldName = $(row).find('td.detailsName').text().toLowerCase().
        replace(/[^a-z0-9]/g, '');
    var fieldValue = $(row).find('td.details').text().trim();

    switch (fieldName) {
      case 'host':
        fields.host = fieldValue;
        break;

      case 'location':
        var locLines = $(row).find('td.details div').html().split('<br>');
        fields.location = locLines[0].trim();
        fields.address = [locLines[1].trim(), ' ', locLines[2].trim()].join('');
        break;

      case 'when':
        var parts = fieldValue.match(
            /[A-Za-z]*, ([A-Za-z]*) ([0-9]*), ([0-9]{1,2}:[0-9]{2}(AM|PM))/);
        var currentYear = (new Date()).getFullYear();
        var startDateTime = [
            parts[1], ' ',
            parts[2], ', ',
            currentYear, ', ',
            CalendarUtils.amPmTimeToIso8601(parts[3])].join('');

        fields.start = new Date(Date.parse(startDateTime));

        fields.end = new Date(Date.parse(startDateTime));
        fields.end.setHours(fields.start.getHours() +
            DEFAULT_DURATION_HOURS_IF_ABSENT);
        break;

      case 'phone':
        fields.phone = fieldValue;
        break;
    }
  }