function(string) {
      var err, res, rest, _ref;
      _ref = parsePhase1(string()), res = _ref[0], err = _ref[1], rest = _ref[2];
      console.log("PHASE 1: " + res);
      if (err) {
        return left("Error at: " + (JSON.stringify(snip(rest))) + "..., " + err);
      } else {
        return right(substituteMacros(res));
      }
    }