function Type__ctor_Once () {
    JSIL.InitializeType(typeObject);

    typeObject.__StructFieldInitializer__ = state.sfi = JSIL.MakeStructFieldInitializer(typeObject);

    state.innerCtor = this._ctor;
    state.hasInnerCtor = typeof (state.innerCtor) === "function";

    if (typeObject.__IsClosed__ === false) {
      state.ctorToCall = openTypeError;
    } else {

      if (state.isStruct) {
        if (state.sfi !== $jsilcore.FunctionNull) {
          if (state.hasInnerCtor) {
            state.ctorToCall = function Type__ctor () {
              state.sfi(this);

              if (arguments.length === 0)
                return;

              return state.innerCtor.apply(this, arguments);
            };

          } else {
            state.ctorToCall = state.sfi;
            
          }

        } else {
          if (state.hasInnerCtor) {
            state.ctorToCall = function Type__ctor () {
              if (arguments.length !== 0)
                return state.innerCtor.apply(this, arguments);              
            };
            
          } else {
            state.ctorToCall = function Type__ctor () {
            };

          }

        }

      } else {
        if (state.sfi !== $jsilcore.FunctionNull) {
          if (state.hasInnerCtor) {
            state.ctorToCall = function Type__ctor () {
              state.sfi(this);

              return state.innerCtor.apply(this, arguments);
            };

          } else {
            state.ctorToCall = state.sfi;

          }

        } else {
          if (state.hasInnerCtor) {
            state.ctorToCall = state.innerCtor;

          } else {
            state.ctorToCall = function Type__ctor () {
            };

          }

        }
      }
    }

    return state.ctorToCall.apply(this, arguments);
  }