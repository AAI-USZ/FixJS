function(attrs) {
      var _ref, _ref1;
      if ((_ref = attrs['xml:lang']) == null) {
        attrs['xml:lang'] = 'en';
      }
      if ((_ref1 = conceptCur.name) == null) {
        conceptCur.name = {};
      }
      return conceptCur.name[attrs['xml:lang']] = this.stringBuffer;
    }