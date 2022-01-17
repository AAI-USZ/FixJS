function(){
      var jsString = "var j = 1;";
      var compressed = this.utils.compressJS(jsString);
    
      assert.equals(typeof(compressed), "string");
      assert.equals("var j=1", compressed);
    }