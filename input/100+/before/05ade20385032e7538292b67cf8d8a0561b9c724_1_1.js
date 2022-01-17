function (baseType, typeName, isIntegral) {
  JSIL.MakeType(baseType, typeName, false, true, [], function ($) {
    $.SetValue("__IsNumeric__", true);
    $.SetValue("__IsIntegral__", isIntegral);

    JSIL.MakeCastMethods(
      $.publicInterface, $.typeObject, isIntegral ? "integer" : "number"
    );
  });
}