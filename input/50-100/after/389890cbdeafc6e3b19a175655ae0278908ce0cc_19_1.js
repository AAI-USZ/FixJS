function JavaArray(elementType, elementClass, dimensions, length){
      this.elementType = elementType;
      this.elementClass = elementClass;
      this.dataType = Enum.dataType.ARRAY;
      this.dimensions = dimensions;
      this.length = length;
      this.array = new Array(length);
    }