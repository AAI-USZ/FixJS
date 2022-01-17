function(){
      var jsString = "var j = 1;";
      var compressed = this.utils.compressJS(jsString);
    
      assert.typeOf(compressed, "string");
      assert.equals("var j=1", compressed);
    }