function(title, author) {
  // Create doc
  var doc =
    document.implementation.createDocument(ParaPara.SVG_NS, "svg", null);
  var svg = doc.documentElement;
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");

  // Add metadata
  if (title) {
    var titleElem = doc.createElementNS(ParaPara.SVG_NS, "title");
    titleElem.appendChild(doc.createTextNode(title));
    svg.appendChild(titleElem);
  }
  if (author) {
    var descElem = doc.createElementNS(ParaPara.SVG_NS, "desc");
    var desc = author + "さんより"; // What should go here?
    descElem.appendChild(doc.createTextNode(desc));
    svg.appendChild(descElem);
  }

  // Set up bounds of animation
  var minX = minY = Number.POSITIVE_INFINITY;
  var maxX = maxY = Number.NEGATIVE_INFINITY;

  // Copy frames to new doc
  var frames = this.animation.childNodes;
  if (!frames.length)
    return null;

  for (var i = 0; i < frames.length; ++i) {
    var frame = frames[i];
    console.assert(frame.childNodes.length,
      "Empty frames should have already been dropped");

    // We really should extend this by the stroke width... but that's kind of
    // complicated. Or we could just wait for SVG 2 ;)
    var bbox = frame.getBBox();
    minX = Math.floor(Math.min(minX, bbox.x));
    maxX = Math.ceil(Math.max(maxX, bbox.x + bbox.width));
    minY = Math.floor(Math.min(minY, bbox.y));
    maxY = Math.ceil(Math.max(maxY, bbox.y + bbox.height));

    svg.appendChild(doc.importNode(frame, true));
  }

  // Bound viewBox of animation by parent viewBox
  var parentViewBox = ParaPara.svgRoot.getAttribute("viewBox");
  console.assert(parentViewBox, "No parent viewBox");
  var parentViewBox = parentViewBox.split(" ");
  var minX = Math.max(minX, parentViewBox[0]);
  var maxX = Math.min(maxX, parentViewBox[0] + parentViewBox[2]);
  // Currently we set the y coordinates of the viewBox to those of the editor
  // workspace. This way, if for example, we have some ground in the background
  // of the editor, the author can line up their animation vertically with the
  // ground.
  var minY = parentViewBox[1];
  var maxY = parentViewBox[1] + parentViewBox[3];
  svg.setAttribute("viewBox", [minX, minY, maxX-minX, maxY-minY].join(" "));

  return doc;
}