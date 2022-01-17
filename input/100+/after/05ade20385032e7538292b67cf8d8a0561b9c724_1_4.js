function Array_New (elementType, sizeOrInitializer) {
  var elementTypeObject = null, elementTypePublicInterface = null;

  if (typeof (elementType.__Type__) === "object") {
    elementTypeObject = elementType.__Type__;
    elementTypePublicInterface = elementType;
  } else if (typeof (elementType.__PublicInterface__) !== "undefined") {
    elementTypeObject = elementType;
    elementTypePublicInterface = elementType.__PublicInterface__;
  }

  var result = null, size = 0;

  if (Array.isArray(sizeOrInitializer)) {
    size = sizeOrInitializer.length;
  } else {
    size = Number(sizeOrInitializer);
  }
  result = new Array(size);

  if (Array.isArray(sizeOrInitializer)) {
    // If non-numeric, assume array initializer
    for (var i = 0; i < sizeOrInitializer.length; i++)
      result[i] = sizeOrInitializer[i];
  } else {
    JSIL.Array.Erase(result, elementType);
  }

  /* Even worse, doing this deoptimizes all uses of the array in TraceMonkey. AUGH
  // Can't do this the right way, because .prototype for arrays in JS is insanely busted
  result.__FullName__ = type.__FullName__ + "[]";
  result.toString = System.Object.prototype.toString;
  */

  return result;
}