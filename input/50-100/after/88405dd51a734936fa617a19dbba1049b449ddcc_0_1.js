function _create(aField) {
      if (typeof aField == "string")
        return new Array(aField);
      return aField;
    }