function Array_Erase (array, elementType) {
  var elementTypeObject, elementTypePublicInterface;

  if (typeof (elementType.__Type__) === "object") {
    elementTypeObject = elementType.__Type__;
    elementTypePublicInterface = elementType;
  } else if (typeof (elementType.__PublicInterface__) !== "undefined") {
    elementTypeObject = elementType;
    elementTypePublicInterface = elementType.__PublicInterface__;
  }

  var size = array.length;

  if (elementTypeObject.__IsStruct__) {
    for (var i = 0; i < size; i++)
      array[i] = JSIL.DefaultValueInternal(elementTypeObject, elementTypePublicInterface);
  } else {
    var defaultValue = JSIL.DefaultValueInternal(elementTypeObject, elementTypePublicInterface)

    for (var i = 0; i < size; i++)
      array[i] = defaultValue;
  }
}