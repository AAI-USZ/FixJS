function(x, xs){
  if (__toString.call(xs).slice(8, -1) === 'String') {
    return x + xs;
  } else {
    return [x].concat(xs);
  }
}