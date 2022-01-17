function decodeTextRegion(huffman, refinement, width, height,
                            defaultPixelValue, numberOfSymbolInstances,
                            stripSize, inputSymbols, symbolCodeLength,
                            transposed, dsOffset, referenceCorner,
                            combinationOperator, huffmanTables,
                            refinementTemplateIndex, refinementAt,
                            decodingContext) {
    if (huffman)
      throw 'huffman is not supported';

    // Prepare bitmap
    var bitmap = [];
    for (var i = 0; i < height; i++) {
      var row = new Uint8Array(width);
      if (defaultPixelValue) {
        for (var j = 0; j < width; j++)
          row[j] = defaultPixelValue;
      }
      bitmap.push(row);
    }

    var decoder = decodingContext.decoder;
    var contextCache = decodingContext.contextCache;

    if (transposed)
      throw 'transposed!=0 is not supported';
    if (combinationOperator != 0 && combinationOperator != 2)
      throw 'combinationOperator==' + combinationOperator + ' is not supported';

    var stripT = -decodeInteger(contextCache, 'IADT', decoder); // 6.4.6
    var firstS = 0;
    var i = 0;
    while (i < numberOfSymbolInstances) {
      var deltaT = decodeInteger(contextCache, 'IADT', decoder); // 6.4.6
      stripT += deltaT;

      var deltaFirstS = decodeInteger(contextCache, 'IAFS', decoder); // 6.4.7
      firstS += deltaFirstS;
      var currentS = firstS;
      do {
        var currentT = stripSize == 1 ? 0 :
          decodeInteger(contextCache, 'IAIT', decoder); // 6.4.9
        var t = stripSize * stripT + currentT;
        var symbolId = decodeIAID(contextCache, decoder, symbolCodeLength);
        var applyRefinement = refinement &&
          decodeInteger(contextCache, 'IARI', decoder);
        var symbolBitmap = inputSymbols[symbolId];
        var symbolWidth = symbolBitmap[0].length;
        var symbolHeight = symbolBitmap.length;
        if (applyRefinement) {
          var rdw = decodeInteger(contextCache, 'IARDW', decoder); // 6.4.11.1
          var rdh = decodeInteger(contextCache, 'IARDH', decoder); // 6.4.11.2
          var rdx = decodeInteger(contextCache, 'IARDX', decoder); // 6.4.11.3
          var rdy = decodeInteger(contextCache, 'IARDY', decoder); // 6.4.11.4
          symbolWidth += rdw;
          symbolHeight += rdh;
          symbolBitmap = decodeRefinement(symbolWidth, symbolHeight,
            refinementTemplateIndex, symbolBitmap, (rdw >> 1) + rdx,
            (rdh >> 1) + rdy, false, refinementAt,
            decodingContext);
        }
        var offsetT = t - ((referenceCorner & 1) ? 0 : symbolHeight);
        var offsetS = currentS - ((referenceCorner & 2) ? symbolWidth : 0);
        for (var t2 = 0; t2 < symbolHeight; t2++) {
          var row = bitmap[offsetT + t2];
          if (!row) continue;
          var symbolRow = symbolBitmap[t2];
          switch (combinationOperator) {
            case 0: // OR
              for (var s2 = 0; s2 < symbolWidth; s2++)
                row[offsetS + s2] |= symbolRow[s2];
              break;
            case 2: // XOR
              for (var s2 = 0; s2 < symbolWidth; s2++)
                row[offsetS + s2] ^= symbolRow[s2];
              break;
          }
        }

        currentS += symbolWidth - 1;
        i++;

        var deltaS = decodeInteger(contextCache, 'IADS', decoder); // 6.4.8
        if (deltaS == null)
          break; // OOB
        currentS += deltaS + dsOffset;
      } while (true);
    }
    return bitmap;
  }