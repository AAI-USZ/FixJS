function() {

    function DateFormatter() {}

    DateFormatter.formatJsonDate = function(dateJson, format) {
      console.log("formatJsonDate: " + dateJson + " with format " + format);
      return $.format.date(this.createJsDateFromJson(dateJson), format);
    };

    DateFormatter.createJsDateFromJson = function(dateJson) {
      return eval("new " + dateJson.slice(1, -1));
    };

    DateFormatter.formatJsDate = function(date, format) {
      return $.format.date(date, format);
    };

    return DateFormatter;

  }