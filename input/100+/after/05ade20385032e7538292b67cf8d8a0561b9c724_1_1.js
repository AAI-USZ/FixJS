function (baseType, typeName, isIntegral, typedArrayName) {
  JSIL.MakeType(baseType, typeName, false, true, [], function ($) {
    $.SetValue("__IsNumeric__", true);
    $.SetValue("__IsIntegral__", isIntegral);

    if (typedArrayName) {
      var typedArrayCtor = eval(typedArrayName);

      if (typedArrayCtor)
        $.SetValue("__TypedArray__", typedArrayCtor);
      else
        $.SetValue("__TypedArray__", null);
      
    } else {
      $.SetValue("__TypedArray__", null);
    }

    JSIL.MakeCastMethods(
      $.publicInterface, $.typeObject, isIntegral ? "integer" : "number"
    );
  });
}