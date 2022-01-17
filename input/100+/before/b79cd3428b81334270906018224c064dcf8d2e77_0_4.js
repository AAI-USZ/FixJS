function (filename) {
      var list = { modules: [], presenter: [] };

      // the result array will be filled by his function
      deepResovle(self, rootname, filename, list);

      // dry result array
      var result = dependencies[filename] = { modules: [], presenter: [] };

      Object.keys(list).forEach(function (rootname) {
        var arr = list[rootname];
        var i = arr.length;
        while(i--) {
          if (result[rootname].indexOf(arr[i]) === -1) {
            result[rootname].push(arr[i]);
          }
        }
      });
    }