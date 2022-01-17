function (f, options) {
  options = options || {};

  var functn = function (x) {
    if (typeof x === 'number') {
      return f.apply('', arguments);
    }
    else if (x.type === 'functn') {
      var outerVar = functn.MathML.childNodes[0].childNodes[0].childNodes[0].outerMathML,
          innerVar = x.MathML.childNodes[0].childNodes[0].childNodes[0].outerMathML,
          innerStr = x.MathML.childNodes[0].childNodes[2].outerMathML.replace('<bvar>' + innerVar + '</bvar>', ''), 
          outerStr = functn.MathML.childNodes[0].childNodes[2].outerMathML.replace(outerVar, innerStr),
          res = '<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar>' + innerVar + '</bvar><domainofapplication><complexes/></domainofapplication>' + outerStr + '</lambda></math>';
      return MathLib.functn(function (y) {return f(x(y));}, {MathMLString: res});
    }
    else if (typeof x === 'function') {
      return function (y) {return f(x(y));};
    }
    else if (x.type === 'set') {
      return MathLib.set( x.map(f) );
    }
    else if(x.type === 'complex') {
      return x[options.name].apply(x, Array.prototype.slice.call(arguments, 1));
    }
    else if (Array.isArray(x)) {
      return x.map(f);
    }
    else {
      return x[name]();
    }
  };

  functn[proto] = prototypes.functn;
  var MathML = options.MathMLString || '';
  
  Object.defineProperties(functn, {
    id: { value: options.name},
    MathML: { value: MathLib.MathML(MathML) }
  });

  return functn;
}