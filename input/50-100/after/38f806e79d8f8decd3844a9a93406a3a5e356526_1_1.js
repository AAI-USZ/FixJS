function(){
    it('should serialize its internal value', function(){
      var objectWithAttr = {x: Ivy.attr(5)};
      var object         = {x: 5};
      assert.equal(
        JSON.stringify(object), 
        JSON.stringify(objectWithAttr)
      );
    });
  }