function(object, response) {
    if (!(object && object.parseBeforeLocalSave)) return response;
    if (_.isFunction(object.parseBeforeLocalSave)) {
      return object.parseBeforeLocalSave(response);
    }
  }