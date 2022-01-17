f    var set = { 'modifiers': [] }, pre, dateFormat, timeFormat, shortDate, shortTime;
    pre = CommonLocales[localeCode] || CommonLocales[localeCode.slice(0,2)];
    if(!pre) return null;
    pre = pre.split(';');
    function bool(n) {
      return !!(pre[0] & math.pow(2, n-1));
    }
    set['monthSuffix'] = pre[1];
    set['yearSuffix'] = pre[2];
    eachLocaleField(function(name, i) {
      set[name] = pre[i + 3] ? pre[i + 3].split(',') : [];
    });

    dateFormat = pre[14];
    timeFormat = pre[15];
    shortDate  = dateFormat.replace(/[,\s]*\{Weekday\}[,\s]*/, '');
    shortTime  = timeFormat.replace(/:?\{ss\}[^{]?/, '');

    set['timeFormat']  = timeFormat;
    set['shortFormat'] = shortDate;
    set['longFormat']  = shortDate + ' ' + shortTime;
    set['fullFormat']  = dateFormat + ' ' + timeFormat;

    set['pm'] = set['12hr'][1];
    ['day','sign','shift','edge'].forEach(function(name, i) {
      if(!pre[i + 16]) return;
      pre[i + 16].split(',').forEach(function(t, j) {
        if(t) set['modifiers'].push({ name: name, src: t, value: j - 2 });
      });
    });
    if(bool(1)) {
      set['digits'] = set['numbers'].join('').replace(/\|/, '');
    }
    set['capitalizeUnit'] = (localeCode == 'de');
    set['hasPlural'] = bool(2);
    set['pastRelativeFormat'] = set['formats'][0];
    set['futureRelativeFormat'] = set['formats'][bool(3) ? 1 : 0];
    set['durationFormat'] = set['formats'][0].replace(/\s*\{sign\}\s*/, '');
    set['variant'] = bool(4);
    return set;
  }
