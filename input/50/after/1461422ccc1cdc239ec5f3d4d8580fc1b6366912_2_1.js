function(value) {
      return balUtilTypes.isObject(value) && value.__proto__ === Object.prototype;
    }