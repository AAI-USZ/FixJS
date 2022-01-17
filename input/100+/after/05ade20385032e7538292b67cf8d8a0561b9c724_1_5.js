function (source, destination, destinationIndex) {
  var srcArray = JSIL.Array.GetElements(source);
  var destArray = JSIL.Array.GetElements(destination);

  var size = Math.min(srcArray.length, destArray.length);

  for (var i = 0; i < size; i++)
    destArray[i + destinationIndex] = srcArray[i];
}