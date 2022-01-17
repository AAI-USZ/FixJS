function() {          
    expect(mm.match("a_str", { 
      's("a_str")@n': "return this.n" 
    })).toBe("a_str");
      
    expect(mm.match("a_str", { 
      's("b_str", "a_str")@n': "return this.n" 
    })).toBe("a_str");    
    
    expect(mm.match("a_str", { 
      's("a_str", "b_str")@n': "return this.n" 
    })).toBe("a_str");        
    
    expect(mm.match("b_str", { 
      's("a_str", "b_str")@n': "return this.n" 
    })).toBe("b_str");    
            
    expect(mm.match("b_str", { 
      's("b_str", "a_str")@n': "return this.n" 
    })).toBe("b_str");    
            
    expect(thunk(mm.match, ["a_str", { 
      's("b_str", 1)@n': "return this.n" 
    }])).toThrow("Unexpected token 1 where string was expected");        
      
    expect(thunk(mm.match, ["a_str", { 
      's("b_str", true)@n': "return this.n" 
    }])).toThrow("Unexpected token t where string was expected");        
    
    expect(mm.match("hello", { 
      's("hello", "world")@n': "return this.n + ' world'" 
    })).toBe("hello world");         

    expect(mm.match("e", { 
      's("a", "b", "c", "z", "e")@n': "return this.n" 
    })).toBe("e");         
    
    expect(mm.match("z", { 
      's("a", "b", "c", "z", "e")@n': "return this.n" 
    })).toBe("z");                         
      
    expect(thunk(mm.match, ["b", { 
      's("c", "d", "e")@n': "return this.n" 
    }])).toThrow("Non-exhaustive patterns");        
      
    expect(mm.match("a_b", { 
      's(  "a_b", "b"   ,  "c")@n': "return this.n" 
    })).toBe("a_b");                   
            
    expect(mm.match(5, { 
      'n(5)@n': "return this.n" 
    })).toBe(5);
      
    expect(mm.match(4, { 
      'n(1,2,3,4,5)@n': "return this.n" 
    })).toBe(4);
      
    expect(mm.match(1.5, { 
      'n(1,2,1.5,1)@n': "return this.n" 
    })).toBe(1.5);

    expect(mm.match(1.4999, { 
      'n(1, 2, 1.4999, 1)@n': "return this.n" 
    })).toBe(1.4999);
      
    expect(mm.match(8000, { 
      'n(1,  8e3)@n': "return this.n" 
    })).toBe(80*100);
      
    expect(mm.match(0.08, { 
      'n(1,  .08)@n': "return this.n" 
    })).toBe(8 / 100);
      
    expect(mm.match(0.04, { 
      'n(1,  +.04)@n': "return this.n" 
    })).toBe(4 / 100);

    expect(mm.match(-5000, { 
      'n(1,  -.5e4)@n': "return this.n" 
    })).toBe(-5000);

    expect(thunk(mm.match, ["4", { 
      'n(1,2,3,4,5)@n': "return this.n" 
    }])).toThrow("Non-exhaustive patterns");
    
    expect(thunk(mm.match, [1.49999, { 
      'n(1.49998)@n': "return this.n" 
    }])).toThrow("Non-exhaustive patterns");        
      
    expect(thunk(mm.match, ["4", {
      'n(1,2,"3",4,5)@n': "return this.n" 
    }])).toThrow('Unexpected token " where numeric was expected');
      
    expect(mm.match(true, { 
      'b(true)@n': "return this.n" 
    })).toBe(true);
      
    expect(mm.match(false, { 
      'b(false)@n': "return this.n" 
    })).toBe(false);
      
    expect(mm.match(false, { 
      'b(true,false)@n': "return this.n" 
    })).toBe(false);
      
    expect(mm.match(true, { 
      'b( true, true,  true  )@n': "return this.n" 
    })).toBe(true);
              
    expect(mm.match([true,false], { 
      'a(b(true)@a, b(false)@b)': "return this.a && this.b" 
    })).toBe(false);
    
    expect(mm.match({x:{y: true}}, { 
      'o(.x:o(.y:b(true)@n))': "return this.n" 
    })).toBe(true);
                                        
    expect(thunk(mm.match, [[false,true], { 
      'a(b(true)@a, b(false)@b)': "return this.a && this.b" 
    }])).toThrow("Non-exhaustive patterns");        
                                                        
    expect(thunk(mm.match, [false, { 
      'b(true)@n': "return this.n" 
    }])).toThrow("Non-exhaustive patterns");        
    
    expect(thunk(mm.match, [1, { 
      'n(,)@n': "return this.n" 
    }])).toThrow("Unexpected token , where numeric was expected");        

    expect(thunk(mm.match, [false, { 
      'b(,)@n': "return this.n" 
    }])).toThrow("Unexpected token , where boolean was expected");        

    expect(thunk(mm.match, ["b", { 
      's(,)@n': "return this.n" 
    }])).toThrow("Unexpected token , where string was expected");        
  }