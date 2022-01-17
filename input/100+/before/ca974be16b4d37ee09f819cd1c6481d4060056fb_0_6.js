function(adu, format) {
      var num = adu[0], u = adu[1], ms = adu[2], sign, unit, last, mult;
      if(this['code'] == 'ru') {
        last = num.toString().from(-1);
        switch(true) {
          case last == 1: mult = 1; break;
          case last >= 2 && last <= 4: mult = 2; break;
          default: mult = 3;
        }
      } else {
        mult = this['hasPlural'] && num > 1 ? 1 : 0;
      }
      unit = this['units'][mult * 8 + u] || this['units'][u];
      if(this['capitalizeUnit']) unit = unit.capitalize();
      sign = this['modifiers'].find(function(m) { return m.name == 'sign' && m.value == (ms > 0 ? 1 : -1); });
      return this[format].assign({ 'num': num, 'unit': unit, 'sign': sign.src });
    }