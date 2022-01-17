function(attrs) {
      if (attrs['xml:lang'] == null) {
        attrs['xml:lang'] = 'en';
      }
      if (contactCur.name == null) {
        contactCur.name = {};
      }
      return contactCur.name[attrs['xml:lang']] = this.stringBuffer;
    }