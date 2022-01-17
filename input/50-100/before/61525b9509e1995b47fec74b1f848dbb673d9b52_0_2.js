function TypedVector (length, fixed) {
      var array = new TypedArray(length);
      for (var i = 0; i < length; i++) {
        array[i] = type.defaultValue;
      }
      return array;
    }