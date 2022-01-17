function ($) {
    $.SetValue("__IsNumeric__", true);
    $.SetValue("__IsIntegral__", isIntegral);

    if (typedArrayName) {
      var typedArrayCtorExists = eval("typeof (" + typedArrayName + ") !== undefined");

      if (typedArrayCtorExists)
        $.SetValue("__TypedArray__", window[typedArrayName]);
      else
        $.SetValue("__TypedArray__", null);

    } else {
      $.SetValue("__TypedArray__", null);
    }

    JSIL.MakeCastMethods(
      $.publicInterface, $.typeObject, isIntegral ? "integer" : "number"
    );
  }