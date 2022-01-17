function(){
      var s = "This is my string";
      var hash = this.utils.generateHash(s);
    
      assert.equals(typeof(hash), "string");
      assert.equals("c2a9ce57e8df081b4baad80d81868bbb", hash);
    
      s = s + " ";
      var hash2 = this.utils.generateHash(s);
    
      refute.equals(hash, hash2);
    }