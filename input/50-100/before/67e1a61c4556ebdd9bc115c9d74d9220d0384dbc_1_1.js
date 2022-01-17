function() {          
    expect(thunk(mm.match, [false, { 
      'x': "return this.n" 
    }])).toThrow("Unexpected token at 0 : x");
      
    expect(thunk(mm.match, [false, { 
      'a(n,n': "return this.n" 
    }])).toThrow("Unexpected token at index 6 expected: ')'");
      
    expect(thunk(mm.match, [false, { 
      'a n)': "return this.n" 
    }])).toThrow("Expected end of input but tokens found: 2");
  }