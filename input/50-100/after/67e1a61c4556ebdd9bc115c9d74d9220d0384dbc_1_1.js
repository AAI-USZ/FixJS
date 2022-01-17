function() {          
    expect(thunk(mm.match, [false, { 
      'x': "return this.n" 
    }])).toThrow("Unexpected token at index 0 expected '(a,o,n,s,b,f,_)' but found x");
      
    expect(thunk(mm.match, [false, { 
      'a(n,n': "return this.n" 
    }])).toThrow("Unexpected token at index 5 expected ')' but found ''");
      
    expect(thunk(mm.match, [false, { 
      'a n)': "return this.n" 
    }])).toThrow("Expected end of input but tokens found: n)");
  }