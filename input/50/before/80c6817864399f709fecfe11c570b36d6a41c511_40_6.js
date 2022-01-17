function() {
      if (conceptSchemeCur.concepts == null) {
        conceptSchemeCur.concepts = {};
      }
      return conceptSchemeCur.concepts[conceptCur.id] = conceptCur;
    }