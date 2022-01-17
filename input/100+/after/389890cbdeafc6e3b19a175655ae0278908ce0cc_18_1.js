function(x){
      if (x !== null && x !== undefined)
      {
        Util.pushElement(x.toString());
        if (x.dataType === Enum.dataType.DOUBLE || x.dataType === Enum.dataType.LONG)
        {
          Util.pushElement(x.toString());
        }
      }
      else if (x === undefined)
        Util.assert(false);
      else
        Util.pushElement("[null]");
        
      
      this.stack.push(x);
      //JavaScript null = Java null. We don't want to check properties on a null value.
      if (x !== null && x !== undefined && (x.dataType === Enum.dataType.DOUBLE || x.dataType === Enum.dataType.LONG))
      {
        this.stack.push(x);
      }
    }