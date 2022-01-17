function (array) {
  if (Array.isArray(array)) {
    return Array.prototype.slice.call(array);
  } else if (Object.getPrototypeOf(array) === JSIL.MultidimensionalArray.prototype) {
    return new JSIL.MultidimensionalArray(array._type, array._dimensions, array._items);
  } else {
    throw new Error("Invalid array");
  }
}