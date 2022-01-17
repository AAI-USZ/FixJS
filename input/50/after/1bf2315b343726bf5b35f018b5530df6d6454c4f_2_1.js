function(){
          return this._datatype !== 'ADT'? arguments[0] : construct(this._tag, arguments);
        }