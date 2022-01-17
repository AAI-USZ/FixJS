function(attrs) {
      if (attrs['xml:lang'] == null) {
        attrs['xml:lang'] = 'en';
      }
      if (conceptCur.description == null) {
        conceptCur.description = {};
      }
      return conceptCur.description[attrs['xml:lang']] = this.stringBuffer;
    }