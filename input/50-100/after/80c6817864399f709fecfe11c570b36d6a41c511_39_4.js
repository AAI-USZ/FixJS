function(attrs) {
      var _ref, _ref1;
      if ((_ref = attrs['xml:lang']) == null) {
        attrs['xml:lang'] = 'en';
      }
      if ((_ref1 = contactCur.name) == null) {
        contactCur.name = {};
      }
      return contactCur.name[attrs['xml:lang']] = this.stringBuffer;
    }