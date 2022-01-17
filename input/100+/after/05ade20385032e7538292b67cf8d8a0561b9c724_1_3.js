function (array) {
  if (Object.getPrototypeOf(array) === JSIL.MultidimensionalArray.prototype)
    return array._items;
  else if (JSIL.IsArray(array))
    return array;
  else
    throw new Error("Argument is not an array");
}