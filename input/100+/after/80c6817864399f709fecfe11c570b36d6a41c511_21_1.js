function(type, obj, results) {
    var key, _ref, _ref1, _ref2;
    if (obj == null) {
      return;
    }
    key = "" + obj.agencyID + ":" + obj.id + "(" + obj.version + ")";
    switch (type) {
      case sdmx.DATA_STRUCTURE_DEFINITION:
        if ((_ref = results.dataStructureDefinitions) == null) {
          results.dataStructureDefinitions = {};
        }
        return results.dataStructureDefinitions[key] = obj;
      case sdmx.CONCEPT_SCHEME:
        if ((_ref1 = results.conceptSchemes) == null) {
          results.conceptSchemes = {};
        }
        return results.conceptSchemes[key] = obj;
      case sdmx.CODE_LIST:
        if ((_ref2 = results.codeLists) == null) {
          results.codeLists = {};
        }
        return results.codeLists[key] = obj;
    }
  }