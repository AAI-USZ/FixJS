function fixSVGs () {
    var svgs = [].slice.call( document.querySelectorAll( "svg" ) ), i, l;
    $(".com\\.sun\\.star\\.drawing\\.LineShape mask").remove();
    
    for ( i = 0, l = svgs.length; i < l; ++i ) {
      SVGContainer( svgs[ i ] )
        .padTextViewports()
        .overlaySelectableSpans() // fix text selection in Firefox
        .joinAdjacentTextEls() // fix text selection in Chrome
        .fixXlinkAttrs(); // fix serialization in Chrome
    }
  }