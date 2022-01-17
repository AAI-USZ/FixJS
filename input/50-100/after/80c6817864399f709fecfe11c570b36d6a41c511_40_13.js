function() {
      var _base, _ref, _ref1;
      if ((_ref = conceptCur.coreRepresentation) == null) {
        conceptCur.coreRepresentation = {};
      }
      if ((_ref1 = (_base = conceptCur.coreRepresentation).enumeration) == null) {
        _base.enumeration = {};
      }
      return conceptCur.coreRepresentation.enumeration.ref = this.parseURN(this.stringBuffer);
    }