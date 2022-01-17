function(classDescriptor) {
      //Well, I am an object...
      if (classDescriptor === "java/lang/Object") {
        return true;
      }
      
      //If it's not an array of the same depth, return false.
      for (var i = 0; i < this.dimensions; i++)
      {
        if (classDescriptor.charAt(i) != '[')
          return false;
      }
      
      var descElementClassName = classDescriptor.slice(this.dimensions);
      
      //It's a primitive array.
      if (this.elementType != Data.type.OBJECT) {
        return descElementClassName === this.elementType;
      }
      
      //Call isA on the element. It's an object array..
      return this.elementClass.isA(descElementClassName);
    }