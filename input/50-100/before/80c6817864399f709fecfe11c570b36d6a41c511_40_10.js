function(attrs) {
      if (attrs['xml:lang'] == null) {
        attrs['xml:lang'] = 'en';
      }
      if (conceptSchemeCur.name == null) {
        conceptSchemeCur.name = {};
      }
      return conceptSchemeCur.name[attrs['xml:lang']] = this.stringBuffer;
    }