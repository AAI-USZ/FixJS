function(n, i) {
      var e = utils.labelInput('color ' + methods[n], n, c, 5);
      e.input.onkeyup = update;

      return {name: n, e: e};
    }