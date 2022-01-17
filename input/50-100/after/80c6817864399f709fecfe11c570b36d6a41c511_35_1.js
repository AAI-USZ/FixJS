function(attrs) {
      var _base, _base1, _name, _ref, _ref1;
      if ((_ref = (_base = seriesCur.obs).attributes) == null) {
        _base.attributes = {};
      }
      if ((_ref1 = (_base1 = seriesCur.obs.attributes)[_name = attrs.concept]) == null) {
        _base1[_name] = [];
      }
      return seriesCur.obs.attributes[attrs.concept].push(attrs.value);
    }