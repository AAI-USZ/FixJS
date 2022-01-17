function(date) {
    var d, day, month, month_to_hebrew, year, _ref;
    try {
      date = date.split('/');
      _ref = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = date.length; _i < _len; _i++) {
          d = date[_i];
          _results.push(parseInt(d, 10));
        }
        return _results;
      })(), year = _ref[0], month = _ref[1], day = _ref[2];
    } catch (error) {
      return "לא הוגדר על ידי הוועדה";
    }
    if (isNaN(year) || isNaN(month)) return "לא הוגדר על ידי הוועדה";
    month_to_hebrew = function(month) {
      switch (month) {
        case 1:
          return "ינואר";
        case 2:
          return "פברואר";
        case 3:
          return "מרץ";
        case 4:
          return "אפריל";
        case 5:
          return "מאי";
        case 6:
          return "יוני";
        case 7:
          return "יולי";
        case 8:
          return "אוגוסט";
        case 9:
          return "ספטמבר";
        case 10:
          return "אוקטובר";
        case 11:
          return "נובמבר";
        case 12:
          return "דצמבר";
      }
    };
    return "" + (month_to_hebrew(month)) + " " + year;
  }