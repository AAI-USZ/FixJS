function() {
      var type = this.elementType;
      
      if (this.elementType === Data.type.OBJECT)
        type = this.elementClass.thisClassName;
      
      var arrayPart = "";
      for (var i = 0; i < this.dimensions; i++)
      {
        arrayPart = "[" + arrayPart + "]";
      }
        
      return "[" + type + arrayPart + "]";
    }