function Type__ctor_Once () {
    JSIL.InitializeType(typeObject);

    typeObject.__StructFieldInitializer__ = sfi = JSIL.MakeStructFieldInitializer(typeObject);

    innerCtor = this._ctor;

    if (typeObject.__IsClosed__ === false) {
      ctorToCall = openTypeError;
    } else {

      if (isStruct) {
        if (sfi !== $jsilcore.FunctionNull) {
          if (innerCtor) {
            ctorToCall = function Type__ctor () {
              sfi(this);

              if (arguments.length === 0)
                return;

              return innerCtor.apply(this, arguments);
            };

          } else {
            ctorToCall = sfi;
            
          }

        } else {
          if (innerCtor) {
            ctorToCall = function Type__ctor () {
              if (arguments.length !== 0)
                return innerCtor.apply(this, arguments);              
            };
            
          } else {
            ctorToCall = function Type__ctor () {
            };

          }

        }

      } else {
        if (sfi !== $jsilcore.FunctionNull) {
          if (innerCtor) {
            ctorToCall = function Type__ctor () {
              sfi(this);

              return innerCtor.apply(this, arguments);
            };

          } else {
            ctorToCall = sfi;

          }

        } else {
          if (innerCtor) {
            ctorToCall = innerCtor;

          } else {
            ctorToCall = function Type__ctor () {
            };

          }

        }
      }
    }

    return ctorToCall.apply(this, arguments);
  }