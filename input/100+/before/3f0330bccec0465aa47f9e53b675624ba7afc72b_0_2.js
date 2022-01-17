function(basis){
    var u;
    var top = [];
    var bottom = [];
    for (var u in basis) {
      if (basis[u] < 0) bottom.push( expString(u, -basis[u]) );
      else top.push(expString(u, basis[u]))
    }
    
    top = top ? top.join('*') : '1';
    
    if (bottom.length) return top + ' / ' + bottom.join('*');
    return top;
  }