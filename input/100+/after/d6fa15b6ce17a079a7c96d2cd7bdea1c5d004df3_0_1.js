function fields(p, joe, o) {
  var cs = o.space;
  var fac = o.limit || 255;
  var fix = o.fix >= 0? o.fix: 0;
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

  var initials = cs.split('').map(function(n) {return n.toUpperCase();});

  if(['RGB', 'HSL', 'HSV', 'CMYK'].indexOf(cs) < 0)
    return console.warn('Invalid field names', cs);

  var c = utils.div('colorFields', p);
  var elems = initials.map(function(n, i) {
    var e = utils.labelInput('color ' + methods[n], n, c, inputLen);
    e.input.onkeyup = update;

    return {name: n, e: e};
  });

  function update() {
    var col = [cs];

    elems.forEach(function(o) {col.push(o.e.input.value / fac);});
    col.push(1); // alpha

    joe.set(onecolor(col));
  }

  return {
    change: function(col) {
      elems.forEach(function(o) {
        o.e.input.value = (col[methods[o.name]]() * fac).toFixed(fix);
      });
    }
  };
}