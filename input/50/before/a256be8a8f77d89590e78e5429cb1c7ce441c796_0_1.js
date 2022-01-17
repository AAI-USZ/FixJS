function getAllProperties (obj, func) {
    for (; obj; obj = obj.__proto__)
      Object.getOwnPropertyNames(obj).forEach(func);
  }