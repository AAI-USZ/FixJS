function(s) {
  var parsed = '';
  if (parsed = s.match(new RegExp(/(\d{4})(-)?(\d{2})(-)?(\d{2})(T)?(\d{2})(:)?(\d{2})(:)?(\d{2})?(\.\d+)?(Z|([+\-])(\d{2})(:)?(\d{2}))?/))) {
    if (parsed[13] === 'Z') {
      var date = new Date();
      date.setUTCFullYear(parseInt(parsed[1], 10));
      date.setUTCMonth(parseInt(parsed[3], 10) - 1);
      date.setUTCDate(parseInt(parsed[5], 10));
      date.setUTCHours(parseInt(parsed[7], 10));
      date.setUTCMinutes(parseInt(parsed[9], 10));
      date.setUTCSeconds(parseInt(parsed[11], 10) || 0);
      return date;
    } else {
      return new Date(
          parseInt(parsed[1], 10),
          parseInt(parsed[3], 10) - 1,
          parseInt(parsed[5], 10),
          parseInt(parsed[7], 10),
          parseInt(parsed[9], 10),
          parseInt(parsed[11], 10) || 0);
    }

  } else if (parsed = s.match(new RegExp(/(\d{4})(-)?(\d{2})(-)?(\d{2})/))) {
    // Parse as just a date, no time.
    return new Date(parsed[1], parseInt(parsed[3], 10) - 1, parsed[5]);

  } else if (parsed = s.match(new RegExp(
      /(\d{1,2})(:)?(\d{2})(:)?(\d{2})(\.\d+)?(Z|([+\-])(\d\d)(:)?(\d\d))?/))) {
    // Parse as just a time, no date.
    var now = new Date();
    return new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        parsed[1],
        parseInt(parsed[3], 10) - 1,
        parsed[5]);

  } else {
    return null;
  }
}