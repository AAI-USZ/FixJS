function decodeSymbolDictionary(huffman, refinement, symbols,
                                  numberOfNewSymbols, numberOfExportedSymbols,
                                  huffmanTables, templateIndex, at,
                                  refinementTemplateIndex, refinementAt,
                                  decodingContext) {
    if (huffman)
      error('JBIG2 error: huffman is not supported');

    var newSymbols = [];
    var currentHeight = 0;
    var symbolCodeLength = log2(symbols.length + numberOfNewSymbols);

    var decoder = decodingContext.decoder;
    var contextCache = decodingContext.contextCache;

    while (newSymbols.length < numberOfNewSymbols) {
      var deltaHeight = decodeInteger(contextCache, 'IADH', decoder); // 6.5.6
      currentHeight += deltaHeight;
      var currentWidth = 0;
      var totalWidth = 0;
      while (true) {
        var deltaWidth = decodeInteger(contextCache, 'IADW', decoder); // 6.5.7
        if (deltaWidth == null)
          break; // OOB
        currentWidth += deltaWidth;
        totalWidth += currentWidth;
        var bitmap;
        if (refinement) {
          // 6.5.8.2 Refinement/aggregate-coded symbol bitmap
          var numberOfInstances = decodeInteger(contextCache, 'IAAI', decoder);
          if (numberOfInstances > 1)
            error('JBIG2 error: number of instances > 1 is not supported');
          var symbolId = decodeIAID(contextCache, decoder, symbolCodeLength);
          var rdx = decodeInteger(contextCache, 'IARDX', decoder); // 6.4.11.3
          var rdy = decodeInteger(contextCache, 'IARDY', decoder); // 6.4.11.4
          var symbol = symbolId < symbols.length ? symbols[symbolId] :
            newSymbols[symbolId - symbols.length];
          bitmap = decodeRefinement(currentWidth, currentHeight,
            refinementTemplateIndex, symbol, rdx, rdy, false, refinementAt,
            decodingContext);
        } else {
          // 6.5.8.1 Direct-coded symbol bitmap
          bitmap = decodeBitmap(false, currentWidth, currentHeight,
            templateIndex, false, null, at, decodingContext);
        }
        newSymbols.push(bitmap);
      }
    }
    // 6.5.10 Exported symbols
    var exportedSymbols = [];
    var flags = [], currentFlag = false;
    while (flags.length < symbols.length + numberOfNewSymbols) {
      var runLength = decodeInteger(contextCache, 'IAEX', decoder);
      while (runLength--)
        flags.push(currentFlag);
      currentFlag = !currentFlag;
    }
    for (var i = 0; i < symbols.length; i++)
      if (flags[i]) exportedSymbols.push(symbols[i]);
    for (var j = 0; j < numberOfNewSymbols; i++, j++)
      if (flags[i]) exportedSymbols.push(newSymbols[j]);
    return exportedSymbols;
  }