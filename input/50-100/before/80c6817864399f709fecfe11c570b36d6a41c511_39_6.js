function(attrs) {
      if (attrs['xml:lang'] == null) {
        attrs['xml:lang'] = 'en';
      }
      if (headerCur.source == null) {
        headerCur.source = {};
      }
      return headerCur.source[attrs['xml:lang']] = this.stringBuffer;
    }