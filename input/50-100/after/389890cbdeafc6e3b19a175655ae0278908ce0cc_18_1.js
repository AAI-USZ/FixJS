function(index, value) {
      this.locals[index] = value;
      //JavaScript null = Java null. We don't want to check properties on a null value.
      if (value !== null && value !== undefined && (value.dataType === Enum.dataType.DOUBLE || value.dataType === Enum.dataType.LONG)) {
        this.locals[index+1] = value;
      }
    }