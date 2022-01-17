function(attrs) {
      if (attrs['xml:lang'] == null) {
        attrs['xml:lang'] = 'en';
      }
      if (partyCur.name == null) {
        partyCur.name = {};
      }
      return partyCur.name[attrs['xml:lang']] = this.stringBuffer;
    }