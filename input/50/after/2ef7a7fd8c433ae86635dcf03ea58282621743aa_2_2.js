function(xs, ys){
  if (__toString.call(ys).slice(8, -1) === 'String') {
    return xs + ys;
  } else {
    return xs.concat(ys);
  }
}