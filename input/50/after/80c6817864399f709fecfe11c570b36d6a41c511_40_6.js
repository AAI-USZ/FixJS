function() {
      var _ref;
      if ((_ref = conceptSchemeCur.concepts) == null) {
        conceptSchemeCur.concepts = {};
      }
      return conceptSchemeCur.concepts[conceptCur.id] = conceptCur;
    }