function (data) {
        var i, results = [], subResult;
        if (!isADT(data))
          return f(data);
        for (i = 0; i < data.length; ++i) {
          subResult = recurse(data[i]);
          if (typeof subResult !== 'undefined')
            results.push(subResult);
        }
        // TODO: Take into account pattern matching requirements...
        return f(construct(data._tag, results));
    }