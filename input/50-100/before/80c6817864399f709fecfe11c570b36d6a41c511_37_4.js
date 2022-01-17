function(attrs) {
      if (attrs['xml:lang'] == null) {
        attrs['xml:lang'] = 'en';
      }
      if (dsdCur.name == null) {
        dsdCur.name = {};
      }
      return dsdCur.name[attrs['xml:lang']] = this.stringBuffer;
    }