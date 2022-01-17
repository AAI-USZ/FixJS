function(options, html) {
      var _ref, _ref1;
      return $((_ref1 = options.html) != null ? _ref1 : html).addClass(options.classes.concat(' groutip')).css((_ref = options.css) != null ? _ref : {});
    }