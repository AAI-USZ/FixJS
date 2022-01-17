function setLocalization(code, set) {
    var loc;
    set = set || getCommonLocalization(code);
    if(!set) {
      throw new Error('Invalid locale.');
    }
    loc = new Localization(set);

    function eachAlternate(str, fn) {
      str = str.split('+').map(function(split) {
        return split.replace(/(.+):(.+)$/, function(full, base, suffixes) {
          return suffixes.split('|').map(function(suffix) {
            return base + suffix;
          }).join('|');
        });
      }).join('|');
      return str.split('|').each(fn);
    }

    function setArray(name, abbreviate, multiple) {
      var arr = [];
      if(!loc[name]) return;
      loc[name].forEach(function(el, i) {
        eachAlternate(el, function(str, j) {
          arr[j * multiple + i] = str.toLowerCase();
        });
      });
      if(abbreviate) arr = arr.concat(loc[name].map(function(str) {
        return str.slice(0,3).toLowerCase();
      }));
      return loc[name] = arr;
    }

    function getDigit(start, stop) {
      var str = '\\d{' + start + ',' + stop + '}';
      if(loc['digits']) str += '|[' + loc['digits'] + ']+';
      return str;
    }

    function getNum() {
      var arr = ['\\d+'].concat(loc['articles']);
      if(loc['numbers']) arr = arr.concat(loc['numbers']);
      return arr.compact().join('|');
    }

    function setModifiers() {
      var arr = [];
      loc.modifiersByName = {};
      loc['modifiers'].each(function(modifier) {
        eachAlternate(modifier.src, function(t) {
          loc.modifiersByName[t] = modifier;
          arr.push({ name: modifier.name, src: t, value: modifier.value });
        });
      });
      arr.groupBy('name', function(name, group) {
        group = group.map('src');
        if(name === 'day') group = group.concat(loc['weekdays']);
        loc[name] = group.join('|');
      });
      loc['modifiers'] = arr;
    }

    setArray('months', true, 12);
    setArray('weekdays', true, 7);
    setArray('units', false, 8);
    setArray('numbers', false, 10);

    loc['code'] = code;
    loc['date'] = getDigit(1,2);
    loc['year'] = getDigit(4,4);
    loc['num']  = getNum();

    setModifiers();

    if(loc['monthSuffix']) {
      loc['month'] = getDigit(1,2);
      loc['months'] = (1).upto(12).map(function(n) { return n + loc['monthSuffix']; });
    }

    addDateInputFormat('(' + loc['months'].compact().join('|') + ')', ['month'], loc);
    addDateInputFormat('(' + loc['weekdays'].compact().join('|') + ')', ['weekday'], loc);
    addDateInputFormat('(' + loc['modifiers'].filter(function(m){ return m.name === 'day'; }).map('src').join('|') + ')', ['day'], loc);

    loc['formats'].each(function(src) {
      loc.addFormat(src, false);
    });

    return Localizations[code] = loc;
  }