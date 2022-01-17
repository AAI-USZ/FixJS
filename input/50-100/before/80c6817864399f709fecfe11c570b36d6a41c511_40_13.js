function() {
      var _base;
      if (conceptCur.coreRepresentation == null) {
        conceptCur.coreRepresentation = {};
      }
      if ((_base = conceptCur.coreRepresentation).enumeration == null) {
        _base.enumeration = {};
      }
      return conceptCur.coreRepresentation.enumeration.ref = this.parseURN(this.stringBuffer);
    }