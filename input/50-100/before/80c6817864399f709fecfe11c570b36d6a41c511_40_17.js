function() {
      var _base;
      if (componentCur.conceptIdentity == null) {
        componentCur.conceptIdentity = {};
      }
      if ((_base = componentCur.conceptIdentity).ref == null) {
        _base.ref = this.parseURN(this.stringBuffer);
      }
      return componentCur.id = componentCur.conceptIdentity.ref.id;
    }