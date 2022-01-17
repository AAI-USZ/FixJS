function formatDate(date, f, relative, locale) {
    var adu, loc = getLocalization(locale), caps = regexp(/^[A-Z]/), value, l;
    if(!date.isValid()) {
      return 'Invalid Date';
    } else if(Date[f]) {
      f = Date[f];
    } else if(object.isFunction(f)) {
      adu = getAdjustedUnit(date.millisecondsFromNow());
      f = f.apply(date, adu.concat(loc));
    }
    if(!f && !relative) {
      f = loc['outputFormat'];
    } else if(!f && relative) {
      adu = adu || getAdjustedUnit(date.millisecondsFromNow());
      // Adjust up if time is in ms, as this doesn't
      // look very good for a standard relative date.
      if(adu[1] === 0) {
        adu[1] = 1;
        adu[0] = 1;
      }
      return loc.relative(adu);
    }
    DateOutputFormats.each(function(dof) {
      f = f.replace(regexp('\\{('+dof.token+')(\\d)?\\}', dof.word ? 'i' : ''), function(m,t,d) {
        var val = dof.format(date, loc, d || 1, t), l = t.length, one = t.match(/^(.)\1+$/);
        if(dof.word) {
          if(l === 3) val = val.to(3);
          if(one || t.match(caps)) val = val.capitalize();
        } else if(one && !dof.text) {
          val = (object.isNumber(val) ? val.pad(l) : val.toString()).last(l);
        }
        return val;
      });
    });
    return f;
  }