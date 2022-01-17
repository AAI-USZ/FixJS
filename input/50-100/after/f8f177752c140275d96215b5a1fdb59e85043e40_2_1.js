function(f){
  return __curry(function(g, x){
    return f(g(g))(x);
  })(__curry(function(g, x){
    return f(g(g))(x);
  }));
}