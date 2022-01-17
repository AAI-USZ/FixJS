function parseTraits(abc, stream, holder) {
  var count = stream.readU30();
  var traits = [];
  for (var i = 0; i < count; i++) {
    traits.push(new Trait(abc, stream, holder));
  }
  return traits;
}