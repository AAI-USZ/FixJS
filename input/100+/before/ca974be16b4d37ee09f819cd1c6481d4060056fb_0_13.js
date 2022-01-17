function buildDateInputFormats() {
    DateArgumentUnits = DateUnits.clone().removeAt(2);
    DateUnitsReversed = DateUnits.clone().reverse();
    var monthReg = '\\d{1,2}|' + English['months'].join('|');
    var prep     = prepareTime(OptionalTime, English);
    StaticInputFormats.each(function(f) {
      addDateInputFormat(f.src.replace(/\{month\}/, monthReg) + (f.time === false ? '' : prep), f.to.concat(TimeFormat), 'en', f.variant);
    });
    addDateInputFormat(prepareTime(RequiredTime), TimeFormat);
  }