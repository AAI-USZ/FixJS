function () {
    var
      ids = Object.keys(idsObj),
      idsLen = ids.length,
      classname = user.getClassName(),
      field = '__name',
      keyFields = [];

    if (idsLen) {

      for (var i = 0; i < idsLen; ++i) {
        var
          key = [classname, ids[i], field];

        keyFields.push(key);
      }
    }

    return {'get' : keyFields};
  }