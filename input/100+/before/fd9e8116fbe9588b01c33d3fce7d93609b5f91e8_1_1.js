function initializeLocalization(code, set) {
    set = set || getCommonLocalization(code);
    if(!set) {
      throw new Error('Invalid locale.');
    }

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
      if(!set[name]) return;
      set[name].forEach(function(el, i) {
        eachAlternate(el, function(str, j) {
          arr[j * multiple + i] = str.toLowerCase();
        });
      });
      if(abbreviate) arr = arr.concat(set[name].map(function(str) {
        return str.slice(0,3).toLowerCase();
      }));
      return set[name] = arr;
    }

    function getDigit(start, stop) {
      var str = '[0-9０-９]' + (start ? '{' + start + ',' + stop + '}' : '+');
      if(set['digits']) str += '|[' + set['digits'] + ']+';
      return str;
    }

    function getNum() {
      var arr = [getDigit()].concat(set['articles']);
      if(!set['digits']) arr = arr.concat(set['numbers']);
      return arr.compact().join('|');
    }

    function setModifiers() {
      var arr = [];
      set.modifiersByName = {};
      set['modifiers'].each(function(modifier) {
        eachAlternate(modifier.src, function(t) {
          set.modifiersByName[t] = modifier;
          arr.push({ name: modifier.name, src: t, value: modifier.value });
        });
      });
      arr.groupBy('name', function(name, group) {
        group = group.map('src');
        if(name === 'day') group = group.concat(set['weekdays']);
        set[name] = group.join('|');
      });
      set['modifiers'] = arr;
    }

    setArray('months', true, 12);
    setArray('weekdays', true, 7);
    setArray('units', false, 8);
    setArray('numbers', false, 10);

    set['code'] = code;
    set['date'] = getDigit(1,2);
    set['year'] = getDigit(4,4);
    set['num']  = getNum();

    setModifiers();

    if(set['monthSuffix']) {
      set['month'] = getDigit(1,2);
      set['months'] = (1).upto(12).map(function(n) { return n + set['monthSuffix']; });
    }
    Localizations[code] = new Localization(set);
  }