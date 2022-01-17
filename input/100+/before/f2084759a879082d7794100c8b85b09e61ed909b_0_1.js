function getCommonLocalization(code) {
    if(code.slice(0,3) == 'en-') code = 'en';
    if(!CommonLocales[code]) return null;
    var set = { 'modifiers': [] }, pre = CommonLocales[code].split(';');
    function bool(n) {
      return !!(pre[0] & Math.pow(2,n-1));
    }
    ['months','weekdays','units','numbers','articles','optionals','formats'].each(function(name, i) {
      set[name] = pre[i + 2] ? pre[i + 2].split(',') : [];
    });
    set['outputFormat'] = pre[9];
    ['day','sign','shift','edge'].each(function(name, i) {
      if(!pre[i + 10]) return;
      pre[i + 10].split(',').each(function(t, j) {
        if(t) set['modifiers'].push({ name: name, src: t, value: j - 2 });
      });
    });
    if(bool(1)) {
      set['digits'] = LowerAsianDigits + UpperAsianDigits;
      if(set['numbers'].length > 0) {
        set['digits'] += set['numbers'].join('');
      } else {
        set['numbers'] = LowerAsianDigits.split('');
      }
      set['monthSuffix'] = pre[1];
    }
    set['capitalizeUnit'] = (code == 'de');
    set['hasPlural'] = bool(2);
    set['pastRelativeFormat'] = set['formats'][0];
    set['futureRelativeFormat'] = set['formats'][bool(3) ? 1 : 0];
    set['durationFormat'] = set['formats'][0].replace(/\s*\{sign\}\s*/, '');
    return set;
  }