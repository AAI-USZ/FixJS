function(attrs) {
      if (attrs['xml:lang'] == null) {
        attrs['xml:lang'] = 'en';
      }
      if (codeListCur.description == null) {
        codeListCur.description = {};
      }
      return codeListCur.description[attrs['xml:lang']] = this.stringBuffer;
    }