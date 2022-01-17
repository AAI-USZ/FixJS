function(attrs) {
      var _ref, _ref1;
      if ((_ref = attrs['xml:lang']) == null) {
        attrs['xml:lang'] = 'en';
      }
      if ((_ref1 = contactCur.department) == null) {
        contactCur.department = {};
      }
      return contactCur.department[attrs['xml:lang']] = this.stringBuffer;
    }