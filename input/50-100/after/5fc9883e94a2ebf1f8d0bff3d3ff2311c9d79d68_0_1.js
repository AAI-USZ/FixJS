function getAllProperties (obj, func) {
    for (; obj !== null && obj !== undefined; obj = obj.__proto__) {
      // Prevent Object.getOwnPropertyNames throwing an error on
      // unboxed types (number, string, boolean)
      if(typeof obj !== 'number' && typeof obj !== 'string'
         && typeof obj !== 'boolean')
        Object.getOwnPropertyNames(obj).forEach(func);
    }
  }