function computeFontMetrics(pfont) {
    var emQuad = 250,
        correctionFactor = pfont.size / emQuad,
        canvas = document.createElement("canvas");
    canvas.width = 2*emQuad;
    canvas.height = 2*emQuad;
    canvas.style.opacity = 0;
    var cfmFont = pfont.getCSSDefinition(emQuad+"px", "normal"),
        ctx = canvas.getContext("2d");
    ctx.font = cfmFont;
    pfont.context2d = ctx;

    // Size the canvas using a string with common max-ascent and max-descent letters.
    // Changing the canvas dimensions resets the context, so we must reset the font.
    var protrusions = "dbflkhyjqpg";
    canvas.width = ctx.measureText(protrusions).width;
    ctx.font = cfmFont;

    // for text lead values, we meaure a multiline text container.
    var leadDiv = document.createElement("div");
    leadDiv.style.position = "absolute";
    leadDiv.style.opacity = 0;
    leadDiv.style.fontFamily = '"' + pfont.name + '"';
    leadDiv.style.fontSize = emQuad + "px";
    leadDiv.innerHTML = protrusions + "<br/>" + protrusions;
    document.body.appendChild(leadDiv);

    var w = canvas.width,
        h = canvas.height,
        baseline = h/2;

    // Set all canvas pixeldata values to 255, with all the content
    // data being 0. This lets us scan for data[i] != 255.
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "black";
    ctx.fillText(protrusions, 0, baseline);
    var pixelData = ctx.getImageData(0, 0, w, h).data;

    // canvas pixel data is w*4 by h*4, because R, G, B and A are separate,
    // consecutive values in the array, rather than stored as 32 bit ints.
    var i = 0,
        w4 = w * 4,
        len = pixelData.length;

    // Finding the ascent uses a normal, forward scanline
    while (++i < len && pixelData[i] === 255) {
      nop();
    }
    var ascent = Math.round(i / w4);

    // Finding the descent uses a reverse scanline
    i = len - 1;
    while (--i > 0 && pixelData[i] === 255) {
      nop();
    }
    var descent = Math.round(i / w4);

    // set font metrics
    pfont.ascent = correctionFactor * (baseline - ascent);
    pfont.descent = correctionFactor * (descent - baseline);

    // Then we try to get the real value from the browser
    if (document.defaultView.getComputedStyle) {
      var leadDivHeight = document.defaultView.getComputedStyle(leadDiv,null).getPropertyValue("height");
      leadDivHeight = correctionFactor * leadDivHeight.replace("px","");
      if (leadDivHeight >= pfont.size * 2) {
        pfont.leading = Math.round(leadDivHeight/2);
      }
    }
    document.body.removeChild(leadDiv);
  }