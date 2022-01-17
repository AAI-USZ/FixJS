function constructYamlTimestamp(node) {
  var match, year, month, day, hour, minute, second, fraction = 0,
      delta = null, tz_hour, tz_minute, data;

  match = TIMESTAMP_REGEXP.exec(this.constructScalar(node));

  // match: [1] year [2] month [3] day

  year = +(match[1]);
  month = +(match[2]) - 1; // JS month starts with 0
  day = +(match[3]);

  if (!match[4]) { // no hour
    return new Date(year, month, day);
  }

  // match: [4] hour [5] minute [6] second [7] fraction

  hour = +(match[4]);
  minute = +(match[5]);
  second = +(match[6]);

  if (!!match[7]) {
    fraction = match[7].slice(0,3);
    while (fraction.length < 3) { // milli-seconds
      fraction += '0';
    }
    fraction = +fraction;
  }

  // match: [8] tz [9] tz_sign [10] tz_hour [11] tz_minute

  if (!!match[9]) {
    tz_hour = +(match[10]);
    tz_minute = +(match[11] || 0);
    delta = (tz_hour * 60 + tz_minute) * 60000; // delta in mili-seconds
    if ('-' === match[9]) {
      delta = -delta;
    }
  }

  data = new Date(year, month, day, hour, minute, second, fraction);

  if (!!delta) {
    data.setTime(data.getTime() - delta);
  }

  return data;
}