function(attrs) {
      if (attrs['xml:lang'] == null) {
        attrs['xml:lang'] = 'en';
      }
      if (codeListCur.name == null) {
        codeListCur.name = {};
      }
      return codeListCur.name[attrs['xml:lang']] = this.stringBuffer;
    }