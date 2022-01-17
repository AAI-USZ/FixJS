function(attrs) {
      var _ref, _ref1;
      if ((_ref = attrs['xml:lang']) == null) {
        attrs['xml:lang'] = 'en';
      }
      if ((_ref1 = conceptSchemeCur.name) == null) {
        conceptSchemeCur.name = {};
      }
      return conceptSchemeCur.name[attrs['xml:lang']] = this.stringBuffer;
    }