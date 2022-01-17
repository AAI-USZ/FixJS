function (source, destination, destinationIndex) {
  var srcArray, destArray;

  if (Array.isArray(source))
    srcArray = source;
  else if (Object.getPrototypeOf(source) === JSIL.MultidimensionalArray.prototype)
    srcArray = source._items;

  if (Array.isArray(destination))
    destArray = destination;
  else if (Object.getPrototypeOf(destination) === JSIL.MultidimensionalArray.prototype)
    destArray = destination._items;

  var size = srcArray.length;

  for (var i = 0; i < size; i++)
    destArray[i + destinationIndex] = srcArray[i];
}