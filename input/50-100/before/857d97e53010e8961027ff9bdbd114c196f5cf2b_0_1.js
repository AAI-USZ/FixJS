function(options, template) {
      var _ref, _ref1;
      return $((_ref1 = options.template) != null ? _ref1 : template).attr('class', options["class"]).css((_ref = options.css) != null ? _ref : {});
    }