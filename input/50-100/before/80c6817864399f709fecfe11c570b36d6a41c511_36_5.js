function(attrs) {
      if (attrs['xml:lang'] == null) {
        attrs['xml:lang'] = 'en';
      }
      if (contactCur.department == null) {
        contactCur.department = {};
      }
      return contactCur.department[attrs['xml:lang']] = this.stringBuffer;
    }