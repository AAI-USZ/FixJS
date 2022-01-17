function() {          
    var obj = {
      an_array: [3,4,5,6,7],
      prop_a: "test",
      prop_b: 42,
      prop_c: {
        coord_a: {
          x: 4,
          y: 3
        },
        coord_b: {
          x: 5,
          y: 27
        }
      }
    };
    
    expect(mm.match(obj, {
      "o(.an_array:a(n@v|))": function () { return this.v; }
    })).toBe(3);    
    
    expect(mm.match(obj, {
      "o(.an_array:a(n|@r))": function () { return this.r.length; }
    })).toBe(4);    
    
    expect(mm.match(obj, {
      "o(.prop_a@v)": function () { return this.v; }
    })).toBe("test");    
    
    expect(mm.match(obj, {
      "o(.prop_b@v)": function () { return this.v; }
    })).toBe(42);    
    
    expect(mm.match(obj, {
      "o(.prop_c@v)": function () { return typeof this.v; }
    })).toBe(typeof {});    
    
    expect(mm.match(obj, {
      "o(.prop_c:o(.coord_a:o(.x@x, .y@y)))": 
        function () { return this.y * this.x; }
    })).toBe(12);  
    
    expect(mm.match(obj, {
      "o(.prop_c:o(.coord_b:o(.y@y, .x@x)))": 
        function () { return this.y * this.x; }
    })).toBe(135);    
  }