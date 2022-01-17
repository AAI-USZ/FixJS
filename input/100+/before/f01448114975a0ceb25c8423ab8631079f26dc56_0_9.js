function SimpleSegmentVisitor_SymbolDictionary(dictionary, currentSegment,
                                                     referredSegments,
                                                     data, start, end) {
      var huffmanTables;
      if (dictionary.huffman)
        throw 'huffman is not supported';

      // Combines exported symbols from all referred segments
      var symbols = this.symbols;
      if (!symbols)
        this.symbols = symbols = {};

      var inputSymbols = [];
      for (var i = 0; i < referredSegments.length; i++)
        inputSymbols = inputSymbols.concat(symbols[referredSegments[i]]);

      var decodingContext = new DecodingContext(data, start, end);
      symbols[currentSegment] = decodeSymbolDictionary(dictionary.huffman,
        dictionary.refinement, inputSymbols, dictionary.numberOfNewSymbols,
        dictionary.numberOfExportedSymbols, huffmanTables,
        dictionary.template, dictionary.at,
        dictionary.refinementTemplate, dictionary.refinementAt,
        decodingContext);
    }