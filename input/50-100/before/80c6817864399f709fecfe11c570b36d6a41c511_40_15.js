function() {
      var _base, _ref;
      if (componentCur.conceptIdentity == null) {
        componentCur.conceptIdentity = {};
      }
      return (_ref = (_base = componentCur.conceptIdentity).ref) != null ? _ref : _base.ref = this.parseURN(this.stringBuffer);
    }