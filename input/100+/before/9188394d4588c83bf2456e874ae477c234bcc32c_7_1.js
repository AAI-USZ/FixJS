function(data) {
      if ('toJSON' in data) {
        return data.toJSON();
      }
      return data;
    }