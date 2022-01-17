function(record, parentRecord, remove) {
    var associationMap = get(record.constructor, 'associations'),
        possibleAssociations = associationMap.get(parentRecord.constructor),
        possible, actual;

    if (!possibleAssociations) { return; }

    for (var i = 0, l = possibleAssociations.length; i < l; i++) {
      possible = possibleAssociations[i];

      if (possible.kind === 'belongsTo') {
        actual = possible;
        break;
      }
    }

    if (actual) {
      set(record, actual.name, remove ? null : parentRecord);
    }
  }