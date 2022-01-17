function JavaArray(elementType, elementClass, dimensions, length){
      this.elementType = elementType;
      this.elementClass = elementClass;
      this.dataType = Data.type.ARRAY;
      this.dimensions = dimensions;
      this.length = length;
      this.array = new Array(length);
    }