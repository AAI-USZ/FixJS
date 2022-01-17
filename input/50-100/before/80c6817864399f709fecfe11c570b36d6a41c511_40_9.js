function(attrs) {
      if (attrs['xml:lang'] == null) {
        attrs['xml:lang'] = 'en';
      }
      if (codeCur.description == null) {
        codeCur.description = {};
      }
      return codeCur.description[attrs['xml:lang']] = this.stringBuffer;
    }