function(n, i) {
      var e = utils.labelInput('color ' + methods[n], n, c, inputLen);
      e.input.onkeyup = update;

      return {name: n, e: e};
    }