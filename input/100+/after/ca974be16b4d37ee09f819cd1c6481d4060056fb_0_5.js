function getCommonLocalization(code) {
    var set = { 'modifiers': [] }, pre;
    pre = CommonLocales[code] || CommonLocales[code.slice(0,2)];
    if(!pre) return null;
    pre = pre.split(';');
    function bool(n) {
      return !!(pre[0] & Math.pow(2, n-1));
    }
    ['months','weekdays','units','numbers','articles','optionals','12hr','timeSuffixes','formats'].each(function(name, i) {
      set[name] = pre[i + 2] ? pre[i + 2].split(',') : [];
    });
    set['outputFormat'] = pre[11];
    set['postMeridian'] = set['12hr'][1];
    ['day','sign','shift','edge'].each(function(name, i) {
      if(!pre[i + 12]) return;
      pre[i + 12].split(',').each(function(t, j) {
        if(t) set['modifiers'].push({ name: name, src: t, value: j - 2 });
      });
    });
    if(bool(1)) {
      set['digits'] = set['numbers'].join('').replace(/\|/, '');
      set['monthSuffix'] = pre[1];
    }
    set['capitalizeUnit'] = (code == 'de');
    set['hasPlural'] = bool(2);
    set['pastRelativeFormat'] = set['formats'][0];
    set['futureRelativeFormat'] = set['formats'][bool(3) ? 1 : 0];
    set['durationFormat'] = set['formats'][0].replace(/\s*\{sign\}\s*/, '');
    set['variant'] = bool(4);
    return set;
  }