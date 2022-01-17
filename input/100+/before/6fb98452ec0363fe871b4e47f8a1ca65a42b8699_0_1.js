function(s, f) {
  var actors = _parseFormat(f),
      exp = _actorsToRegex(actors),
      dateObj = {year: 0, month: 0, date: 1, hour: 0, minute: 0, second: 0, ms: 0, offset: 0},
      mappedObj = {},
      i = -1,
      actor,
      match,
      handler;
  if (exp.test(s)) {
    match = exp.exec(s);
    while (actor = actors[++i]) {
      mappedObj[actor] = match[i + 1];
    }
  }
  for (actor in mappedObj) {
    handler = ns.fn[actor];
    if (handler) {
      handler.i(mappedObj[actor], dateObj, mappedObj);
    }
  }
  return new Date(
      _pad(dateObj.year, 4)
    + '/'
    + _pad(dateObj.month + 1, 2)
    + '/'
    + _pad(dateObj.date, 2)
    + ' '
    + _pad(dateObj.hour, 2)
    + ':'
    + _pad(dateObj.minute, 2)
    + ':'
    + _pad(dateObj.second, 2)
    + (dateObj.ms > 0 ? '.' + _pad(dateObj.ms, 3) : '')
    + (dateObj.offset >= 0 ? '+' : '-')
    + _pad(Math.floor(Math.abs(dateObj.offset / 60)), 2)
    + ':'
    + _pad(Math.abs(dateObj.offset % 60), 2));
}