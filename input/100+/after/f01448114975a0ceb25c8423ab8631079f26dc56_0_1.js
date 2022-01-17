function decodeBitmap(mmr, width, height, templateIndex, prediction, skip, at,
                        decodingContext) {
    if (mmr)
      error('JBIG2 error: MMR encoding is not supported');

    var useskip = !!skip;
    var template = CodingTemplates[templateIndex].concat(at);
    var templateLength = template.length;
    var templateX = new Int32Array(templateLength);
    var templateY = new Int32Array(templateLength);
    for (var k = 0; k < templateLength; k++) {
      templateX[k] = template[k].x;
      templateY[k] = template[k].y;
    }

    var pseudoPixelContext = ReusedContexts[templateIndex];
    var bitmap = [];

    var decoder = decodingContext.decoder;
    var contexts = decodingContext.contextCache.getContexts('GB');

    var ltp = 0;
    for (var i = 0; i < height; i++) {
      if (prediction) {
        var cx = contexts[pseudoPixelContext];
        if (!cx)
          contexts[pseudoPixelContext] = cx = {index: 0, mps: 0};
        var sltp = decoder.readBit(cx);
        ltp ^= sltp;
      }
      if (ltp) {
        bitmap.push(bitmap[bitmap.length - 1]); // duplicate previous row
        continue;
      }
      var row = new Uint8Array(width);
      bitmap.push(row);
      for (var j = 0; j < width; j++) {
        if (useskip && skip[i][j]) {
          row[j] = 0;
          continue;
        }
        var contextLabel = 0;
        for (var k = 0; k < templateLength; k++) {
          var i0 = i + templateY[k], j0 = j + templateX[k];
          if (i0 < 0 || j0 < 0 || j0 >= width)
            contextLabel <<= 1; // out of bound pixel
          else
            contextLabel = (contextLabel << 1) | bitmap[i0][j0];
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