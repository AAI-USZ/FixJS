function(attrs) {
      if (attrs['xml:lang'] == null) {
        attrs['xml:lang'] = 'en';
      }
      if (headerCur.name == null) {
        headerCur.name = {};
      }
      return headerCur.name[attrs['xml:lang']] = this.stringBuffer;
    }