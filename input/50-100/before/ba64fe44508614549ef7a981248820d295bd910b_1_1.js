function(item, value) {
      var result;
      if (typeof item[value] === "function") {
        result = item[value]();
      } else {
        result = item[value];
      }
      return result;
    }