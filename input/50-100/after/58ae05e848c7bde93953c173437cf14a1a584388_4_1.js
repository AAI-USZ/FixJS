function () {
    var
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