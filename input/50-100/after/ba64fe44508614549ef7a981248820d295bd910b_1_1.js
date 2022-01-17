function(item, value) {
      var result;
      if (typeof item[value] === "function") {
        result = item[value]();
      } else {
        result = Object.getPrototypeOf(item)[value];
      }
      return result;
    }