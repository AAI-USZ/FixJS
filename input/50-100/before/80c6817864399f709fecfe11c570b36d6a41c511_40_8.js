function(attrs) {
      if (attrs['xml:lang'] == null) {
        attrs['xml:lang'] = 'en';
      }
      if (codeCur.name == null) {
        codeCur.name = {};
      }
      return codeCur.name[attrs['xml:lang']] = this.stringBuffer;
    }