function(options, html) {
      var classes, _ref, _ref1;
      classes = typeof options.classes === 'string' ? "" + options.classes + " groutip" : 'groutip';
      return $((_ref1 = options.html) != null ? _ref1 : html).addClass(classes).css((_ref = options.css) != null ? _ref : {});
    }