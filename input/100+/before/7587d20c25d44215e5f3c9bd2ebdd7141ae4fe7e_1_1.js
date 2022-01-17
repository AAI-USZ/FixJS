function (publicInterface, typeObject, specialType) {
  if (!typeObject)
    throw new Error("Null type object");
  if (!publicInterface)
    throw new Error("Null public interface");

  var castFunction, asFunction, isFunction;
  var customCheckOnly = false;
  var checkMethod = publicInterface.CheckType || null;
  var typeId = typeObject.__TypeId__;

  typeObject.__CastSpecialType__ = specialType;

  var throwCastError = function (value) {
    throw new System.InvalidCastException("Unable to cast object of type '" + JSIL.GetTypeName(JSIL.GetType(value)) + "' to type '" + JSIL.GetTypeName(typeObject) + "'.");
  };

  isFunction = function Is (expression, bypassCustomCheckMethod) {
    if (expression) {
      var valueType = expression.__ThisType__;
      if (valueType) {
        return (valueType.__AssignableTypes__[typeId] === true);
      } else {
        return JSIL.$SlowCheckType(expression, publicInterface);
      }
    }

    return false;
  };

  asFunction = function As (expression) {
    if (isFunction(expression))
      return expression;
    else
      return null;
  };

  castFunction = function Cast (expression) {
    if (expression === null)
      return null;
    else if (expression === undefined)
      throwCastError(expression);

    if (isFunction(expression))
      return expression;
    else
      throwCastError(expression);
  };

  switch (specialType) {
    case "interface":
      break;

    case "enum":
      customCheckOnly = true;    
      asFunction = throwCastError;

      castFunction = function Cast_Enum (expression) {
        var n = Number(expression);

        var result = typeObject.__ValueToName__[n];
        if (result)
          return publicInterface[result];

        return JSIL.MakeEnumValue(
          typeObject, n, null, typeObject.__IsFlagsEnum__
        );
      };

      break;

    case "delegate":
      break;

    case "array":
      break;

    case "integer":
      customCheckOnly = true;    
      asFunction = throwCastError;

      var _castFunction = castFunction;
      castFunction = function Cast_Integer (expression) {
        return Math.floor(_castFunction(expression));
      };

      break;

    case "number":
      customCheckOnly = true;    
      asFunction = throwCastError;

      break;
  }

  if (checkMethod) {
    if (customCheckOnly) {
      isFunction = function Is_CheckMethod_Only (expression, bypassCustomCheckMethod) {
        return checkMethod(expression);
      };

    } else {
      var _isFunction = isFunction;
      isFunction = function Is_CheckMethod_Or_CheckType (expression, bypassCustomCheckMethod) {
        if (bypassCustomCheckMethod !== true)
          return checkMethod(expression);
        else
          return _isFunction(expression, bypassCustomCheckMethod);
      };

    }
  }

  castFunction = JSIL.RenameFunction(typeObject.__FullName__ + ".$Cast", castFunction);
  asFunction   = JSIL.RenameFunction(typeObject.__FullName__ + ".$As"  , asFunction);
  isFunction   = JSIL.RenameFunction(typeObject.__FullName__ + ".$Is"  , isFunction);

  publicInterface.$Cast = typeObject.$Cast = castFunction;
  publicInterface.$As   = typeObject.$As   = asFunction;
  publicInterface.$Is   = typeObject.$Is   = isFunction;
}