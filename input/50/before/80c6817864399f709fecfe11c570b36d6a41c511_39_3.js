function(attrs) {
      if (headerCur.structure == null) {
        headerCur.structure = {};
      }
      return headerCur.structure[structureCur.structureID] = structureCur;
    }