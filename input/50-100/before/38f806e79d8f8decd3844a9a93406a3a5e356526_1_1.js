function(){
    it('should serialize its internal value', function(){
      var objectWithAttr = {x: Ivy.attr(5)};
      var object         = {x: 5};
      assert.equal(
        JSON.stringify(object), 
        JSON.stringify(objectWithAttr)
      );
    });
    
    it('should allow coercion', function(){
      var value = Ivy.attr(5) + 1;
      assert.equal(value, 6);
    });
  }