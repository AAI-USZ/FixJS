function getAllProperties (obj, func) {
    for (; obj; obj = obj.__proto__) {
      // Prevent Object.getOwnPropertyNames throwing an error on
      // unboxed types (number, string, boolean)
      if(obj instanceof Object)
        Object.getOwnPropertyNames(obj).forEach(func);
    }
  }