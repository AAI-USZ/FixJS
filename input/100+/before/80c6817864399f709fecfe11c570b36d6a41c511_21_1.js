function(type, obj, results) {
    var key;
    if (obj == null) {
      return;
    }
    key = "" + obj.agencyID + ":" + obj.id + "(" + obj.version + ")";
    switch (type) {
      case sdmx.DATA_STRUCTURE_DEFINITION:
        if (results.dataStructureDefinitions == null) {
          results.dataStructureDefinitions = {};
        }
        return results.dataStructureDefinitions[key] = obj;
      case sdmx.CONCEPT_SCHEME:
        if (results.conceptSchemes == null) {
          results.conceptSchemes = {};
        }
        return results.conceptSchemes[key] = obj;
      case sdmx.CODE_LIST:
        if (results.codeLists == null) {
          results.codeLists = {};
        }
        return results.codeLists[key] = obj;
    }
  }