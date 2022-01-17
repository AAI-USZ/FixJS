function(attrs) {
      if (attrs['xml:lang'] == null) {
        attrs['xml:lang'] = 'en';
      }
      if (conceptCur.name == null) {
        conceptCur.name = {};
      }
      return conceptCur.name[attrs['xml:lang']] = this.stringBuffer;
    }