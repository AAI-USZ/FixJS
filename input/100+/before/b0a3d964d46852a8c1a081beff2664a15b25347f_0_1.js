function fields(cs, fac) {
  fac = fac || 255;
  var methods = {
    R: 'red',
    G: 'green',
    B: 'blue',
    H: 'hue',
    S: 'saturation',
    V: 'value',
    L: 'lightness',
    C: 'cyan',
    M: 'magenta',
    Y: 'yellow',
    K: 'black'
  };
  var chg = false; // XXX

  var initials = cs.split('').map(function(n) {return n.toUpperCase();});

  if(['RGB', 'HSL', 'HSV', 'CMYK'].indexOf(cs) < 0)
    return console.warn('Invalid field names', cs);

  return function(p, joe) {
    var c = utils.div('colorFields', p);
    var elems = initials.map(function(n, i) {
      var e = utils.labelInput('color ' + methods[n], n, c, 5);
      e.input.onkeyup = update;

      return {name: n, e: e};
    });

    function update() {
      var col = [];

      elems.forEach(function(o) {col.push(o.e.input.value / fac);});

      chg = true;
      joe.set(construct(onecolor[cs], col));
    }

    return {
      change: function(col) {
        if(!chg)
          elems.forEach(function(o) {
            o.e.input.value = col[methods[o.name]]() * fac;
          });
        chg = false;
      }
    };
  };
}