function (array) {
  if (Object.getPrototypeOf(array) === JSIL.MultidimensionalArray.prototype) {
    return new JSIL.MultidimensionalArray(array._type, array._dimensions, array._items);
  } else if (JSIL.IsArray(array)) {
    return Array.prototype.slice.call(array);
  } else {
    throw new Error("Invalid array");
  }
}