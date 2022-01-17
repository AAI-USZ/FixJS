function(){
          return this._datatype !== 'ADT'? arguments[0] : construct.apply(null, [this._tag].concat([].slice.call(arguments, 0)));
        }