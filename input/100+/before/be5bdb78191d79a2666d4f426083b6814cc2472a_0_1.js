function() {
      var scope = this.elementStack[0];
      var scopeValue = getValueFromScope(scope);
      var fid = scope.fields.shift();
      if(!fid)
        return {fname:'', ftype:Type.STOP};

      var fieldValue = scopeValue[fid];
      for(var soleMember in fieldValue) {
        this.elementStack.unshift({value:fieldValue[soleMember]});
        return {
          fname:'',
          fid:Number(fid),
          ftype:RType[soleMember]
        };
      }
      /* there are no members, which is a format error */
      throw new Error("TNativeJSONProtocol: parse error reading field value");
    }