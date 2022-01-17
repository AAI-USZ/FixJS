function(string) {
      var charArray = new JavaArray(Enum.dataType.CHAR, null, 1, string.length);
      for (var i = 0; i < string.length; i++)
      {
        charArray.set(i, Primitives.getChar(string.charCodeAt(i)));
      }
      
      return MethodRun.constructObject("java/lang/String", "([C)V", charArray);
    }