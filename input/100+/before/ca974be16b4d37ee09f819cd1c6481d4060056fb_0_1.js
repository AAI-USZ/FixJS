function checkLocaleFormatsAdded(loc) {
    var code = loc['code'];
    if(loc.formatsAdded) return;
    addDateInputFormat('(' + loc['months'].compact().join('|') + ')', ['month'], code);
    addDateInputFormat('(' + loc['weekdays'].compact().join('|') + ')', ['weekday'], code);
    addDateInputFormat('(' + loc['modifiers'].filter(function(m){ return m.name === 'day'; }).map('src').join('|') + ')', ['day'], code);
    loc['formats'].each(function(src) {
      loc.addFormat(src, code, false);
    });
    loc.formatsAdded = true;
  }