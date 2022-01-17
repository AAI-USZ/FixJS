function(test) {
  var clip = require("clipboard");
  var flavor = "image";
  var fullFlavor = "image/png";

  var base64Data = "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAQ0lEQVRYhe3OwQkAIBTD0Oyqg7idbqUr9B9EhBRyLY8F+0akEyBAgIBvAI1eCuaIEiBAgAABzwH50sNqAgQIEPAYcABJQw5EXdmcNgAAAABJRU5ErkJggg==";
  var contents = "data:image/png;base64," + encodeURIComponent(base64Data);
  test.assert(clip.set(contents, flavor), "clipboard set");
  test.assertEqual(clip.currentFlavors[0], flavor, "flavor is set");

  test.assertEqual(clip.get(), contents, "image data equals");
}