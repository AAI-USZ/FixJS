function() {          
    expect(mm.match(1, { 
      'n@n': "return this.n" 
    })).toBe(1);
      
    expect(mm.match('s', { 
      's@n': "return this.n" 
    })).toBe('s');
      
    expect(mm.match(true, { 
      'b@n': "return this.n" 
    })).toBe(true);
      
    expect(mm.match(function (x) {return x;}, { 
      'f@n': "return this.n" 
    })(1)).toBe(1);       
  }