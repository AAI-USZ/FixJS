function() {          
    var m = mm.match;
    var a = [1,2,[{x: 5}], 'string', function (x) { return x*x }];
    
    expect(m(a, {
      '_@a': function () {return this.a.length === 5} 
    })).toBe(true);
      
    expect(m(a, { 
      'a': 'return true' 
    })).toBe(true);     
      
    expect(m(a, { 
      'a(n,n|)': 'return true' 
    })).toBe(true);
      
    expect(m(a, { 
      'a(n,n,a,s,f)': 'return true' 
    })).toBe(true);    
      
    expect(thunk(m, [a, { 
      'a(n,n,s,a,f)': 'return true' 
    }])).toThrow("Non-exhaustive patterns");
      
    expect(m(a, { 
      'a(_,n@x,a(o@obj)|)': 'return this.obj.x * this.x' 
    })).toBe(10);
    
    expect(m(a, { 
      'a(n(1,2,3)@a, n(3,2,1)@b|)': 'return this.a * this.b' 
    })).toBe(2); 

    expect(m([1,2,3], {    
      'a(_|@r)': function () {
         return this.r[0] * this.r[1];
      }
    })).toBe(6);

    expect(m([[[[5]]]], {    
      'a(a(a(a(n@x))))': function () {
         return this.x;
      }
    })).toBe(5);
          
    expect(thunk(m, [[], { 
      'a(,)': 'return true' 
    }])).toThrow("Unexpected token at index 2 expected '(a,o,n,s,b,f,_)' but found ,");
    
  }