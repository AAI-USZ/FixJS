function(attrs) {
      if (attrs['xml:lang'] == null) {
        attrs['xml:lang'] = 'en';
      }
      if (dataStructureCur.name == null) {
        dataStructureCur.name = {};
      }
      return dataStructureCur.name[attrs['xml:lang']] = this.stringBuffer;
    }