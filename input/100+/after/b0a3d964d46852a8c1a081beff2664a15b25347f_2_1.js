function fields(cs, fac, fix) {
  fac = fac || 255;
  fix = fix >= 0? fix: 2;
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
  var inputLen = ('' + fac).length + fix;
  inputLen = fix? inputLen + 1: inputLen;
  var chg = false; // XXX

  var initials = cs.split('').map(function(n) {return n.toUpperCase();});

  if(['RGB', 'HSL', 'HSV', 'CMYK'].indexOf(cs) < 0)
    return console.warn('Invalid field names', cs);

  return function(p, joe) {
    var c = utils.div('colorFields', p);
    var elems = initials.map(function(n, i) {
      var e = utils.labelInput('color ' + methods[n], n, c, inputLen);
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
            o.e.input.value = (col[methods[o.name]]() * fac).toFixed(fix);
          });
        chg = false;
      }
    };
  };
}