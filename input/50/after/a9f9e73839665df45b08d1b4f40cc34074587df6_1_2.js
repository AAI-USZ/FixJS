function(dict) {
      var key, newDict;
      newDict = {};
      for (key in dict) {
        newDict[this._idMap[key]] = key;
      }
      return newDict;
    }