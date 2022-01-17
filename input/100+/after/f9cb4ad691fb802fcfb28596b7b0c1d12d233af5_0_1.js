function makeContainer( el ) {
  // Returns a <div> wrapping the target element, causing it to scale
  // to match the container's width at a fixed aspect ratio. The container
  // may be used to position elements relative to the SVG.

  var container = document.createElement( "div" ),
      canvasForScale = document.createElement( "canvas" ),
      imageForScale = document.createElement( "img" ),
      parentNode = el.parentNode;

  container.classList.add( "SVGContainer" );
  container.style.position = "relative";

  el.style.position = "absolute";
  el.style.top = 0;
  el.style.bottom = 0;
  el.style.left = 0;
  el.style.right = 0;
  el.style.width = "100%";
  el.style.height = "100%";

  var viewBoxWidth = el.viewBox.baseVal.width,
      viewBoxHeight = el.viewBox.baseVal.height,
      viewBoxDimensionsGCD = gcd(viewBoxHeight, viewBoxWidth);

  canvasForScale.width = viewBoxWidth / viewBoxDimensionsGCD;
  canvasForScale.height = viewBoxHeight / viewBoxDimensionsGCD;

  imageForScale.classList.add( "SVGContainer-scaler" );
  imageForScale.src = canvasForScale.toDataURL();
  imageForScale.style.width = "100%";
  imageForScale.style.height = "auto";
  imageForScale.style.maxHeight = "none";
  imageForScale.style.minHeight = "none";
  imageForScale.style.maxWidth = "none";
  imageForScale.style.maxHeight = "none";
  imageForScale.style.margin = 0;
  imageForScale.style.display = "block";

  if ( parentNode ) {
    parentNode.replaceChild( container, el );
  }

  container.appendChild( el );
  container.appendChild( imageForScale );

  return container;
}