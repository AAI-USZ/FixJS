function() {
    
    it("converts simple json to all puts", function(){
      var json = Types.updateAttributes({name: "Foo", age: 44, nums: [1,2,3], strs: ["Ryan", "ED", "Fitz"]});
      
      json.should.eql({
        "name":{"Value":{"S":"Foo"},"Action":"PUT"},
        "age" :{"Value":{"N":"44"},"Action":"PUT"},
        "nums" :{"Value":{"NS":["1","2", "3"]},"Action":"PUT"},
        "strs" :{"Value":{"SS":["Ryan","ED", "Fitz"]},"Action":"PUT"}
      });

    });

    it("converts to add schema", function(){
      var json = Types.updateAttributes({age: {add: 4}});
      
      json.should.eql({
        "age":{"Value":{"N":"4"},"Action":"ADD"}
      });

    });

    it("converts to subtract number schema", function(){
      var json = Types.updateAttributes({age: {delete: 4}});
      
      json.should.eql({
        "age":{"Value":{"N":"4"},"Action":"DELETE"}
      });

    });

    it("converts to delete attribute schema", function(){
      var json = Types.updateAttributes({age: {Action: 'DELETE'}});
      
      json.should.eql({
        "age":{"Action":"DELETE"}
      });
    });

    it("converts empty string to delete action", function(){
      var json = Types.updateAttributes({age: ""});
      
      json.should.eql({
        "age":{"Action":"DELETE"}
      });
    });

    it("converts null to delete action", function(){
      var json = Types.updateAttributes({age: null});
      
      json.should.eql({
        "age":{"Action":"DELETE"}
      });
    });

    it("converts empty array to delete action", function(){
      var json = Types.updateAttributes({nums: []});
      
      json.should.eql({
        "nums":{"Action":"DELETE"}
      });
    });

    it("converts to put schema", function(){
      var json = Types.updateAttributes({age: {put: 4}});
      
      json.should.eql({
        "age":{"Value":{"N":"4"},"Action":"PUT"}
      });

    });

    it("converts to add to set schema", function(){
      var json = Types.updateAttributes({letters: {add: ['a', 'b']}});
     
      json.should.eql({
        "letters":{"Value":{"SS":['a', 'b']},"Action":"ADD"}
      });

    });

  }