function decodeRefinement(width, height, templateIndex, referenceBitmap,
                            offsetX, offsetY, prediction, at,
                            decodingContext) {
    var codingTemplate = RefinementTemplates[templateIndex].coding;
    if (templateIndex == 0)
      codingTemplate = codingTemplate.concat([at[0]]);
    var codingTemplateLength = codingTemplate.length;
    var codingTemplateX = new Int32Array(codingTemplateLength);
    var codingTemplateY = new Int32Array(codingTemplateLength);
    for (var k = 0; k < codingTemplateLength; k++) {
      codingTemplateX[k] = codingTemplate[k].x;
      codingTemplateY[k] = codingTemplate[k].y;
    }
    var referenceTemplate = RefinementTemplates[templateIndex].reference;
    if (templateIndex == 0)
      referenceTemplate = referenceTemplate.concat([at[1]]);
    var referenceTemplateLength = referenceTemplate.length;
    var referenceTemplateX = new Int32Array(referenceTemplateLength);
    var referenceTemplateY = new Int32Array(referenceTemplateLength);
    for (var k = 0; k < referenceTemplateLength; k++) {
      referenceTemplateX[k] = referenceTemplate[k].x;
      referenceTemplateY[k] = referenceTemplate[k].y;
    }
    var referenceWidth = referenceBitmap[0].length;
    var referenceHeight = referenceBitmap.length;

    var pseudoPixelContext = RefinementReusedContexts[templateIndex];
    var bitmap = [];

    var decoder = decodingContext.decoder;
    var contexts = decodingContext.contextCache.getContexts('GR');

    var ltp = 0;
    for (var i = 0; i < height; i++) {
      if (prediction) {
        var cx = contexts[pseudoPixelContext];
        if (!cx)
          contexts[pseudoPixelContext] = cx = {index: 0, mps: 0};
        var sltp = decoder.readBit(cx);
        ltp ^= sltp;
      }
      var row = new Uint8Array(width);
      bitmap.push(row);
      for (var j = 0; j < width; j++) {
        if (ltp)
          error('JBIG2 error: prediction is not supported');

        var contextLabel = 0;
        for (var k = 0; k < codingTemplateLength; k++) {
          var i0 = i + codingTemplateY[k], j0 = j + codingTemplateX[k];
          if (i0 < 0 || j0 < 0 || j0 >= width)
            contextLabel <<= 1; // out of bound pixel
          else
            contextLabel = (contextLabel << 1) | bitmap[i0][j0];
        }
        for (var k = 0; k < referenceTemplateLength; k++) {
          var i0 = i + referenceTemplateY[k] + offsetY;
          var j0 = j + referenceTemplateX[k] + offsetX;
          if (i0 < 0 || i0 >= referenceHeight || j0 < 0 || j0 >= referenceWidth)
            contextLabel <<= 1; // out of bound pixel
          else
            contextLabel = (contextLabel << 1) | referenceBitmap[i0][j0];
        }
        var cx = contexts[contextLabel];
        if (!cx)
          contexts[contextLabel] = cx = {index: 0, mps: 0};
        var pixel = decoder.readBit(cx);
        row[j] = pixel;
      }
    }

    return bitmap;
  }