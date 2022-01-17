function (typeObject) {
  var openTypeError = function OpenType__ctor () {
    throw new Error("Cannot construct an instance of an open type");
  };

  var state = {
    typeName: typeObject.__FullName__,
    isStruct: typeObject.__IsStruct__,
    hasInnerCtor: false,
    sfi: $jsilcore.FunctionNotInitialized,
    innerCtor: $jsilcore.FunctionNotInitialized,
    ctorToCall: $jsilcore.FunctionNotInitialized
  };

  var oneTime = function Type__ctor_Once () {
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
  };

  state.ctorToCall = oneTime;

  var ctorGenerator = JSIL.CreateNamedFunction(
    state.typeName + "_MakeCtor",
    ["state"],
    "var result = function " + JSIL.EscapeJSIdentifier(state.typeName) + " () {\r\n" +
    "  return state.ctorToCall.apply(this, arguments);\r\n" +
    "};\r\n" +
    "return result;"
  );

  var result = ctorGenerator(state);

  return result;
}