function (field) {
      var include = '-' == field[0] ? 0 : 1;
      if (!include) field = field.substring(1);
      fields[field] = include;
    }