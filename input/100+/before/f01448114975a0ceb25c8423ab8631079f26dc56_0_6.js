function processSegment(segment, visitor) {
    var header = segment.header;

    var data = segment.data, position = segment.start, end = segment.end;
    var args;
    switch (header.type) {
      case 0: // SymbolDictionary
        // 7.4.2 Symbol dictionary segment syntax
        var dictionary = {};
        var dictionaryFlags = readUint16(data, position); // 7.4.2.1.1
        dictionary.huffman = !!(dictionaryFlags & 1);
        dictionary.refinement = !!(dictionaryFlags & 2);
        dictionary.huffmanDHSelector = (dictionaryFlags >> 2) & 3;
        dictionary.huffmanDWSelector = (dictionaryFlags >> 4) & 3;
        dictionary.bitmapSizeSelector = (dictionaryFlags >> 6) & 1;
        dictionary.aggregationInstancesSelector = (dictionaryFlags >> 7) & 1;
        dictionary.bitmapCodingContextUsed = !!(dictionaryFlags & 256);
        dictionary.bitmapCodingContextRetained = !!(dictionaryFlags & 512);
        dictionary.template = (dictionaryFlags >> 10) & 3;
        dictionary.refinementTemplate = (dictionaryFlags >> 12) & 1;
        position += 2;
        if (!dictionary.huffman) {
          var atLength = dictionary.template == 0 ? 4 : 1;
          var at = [];
          for (var i = 0; i < atLength; i++) {
            at.push({
              x: readInt8(data, position),
              y: readInt8(data, position + 1)
            });
            position += 2;
          }
          dictionary.at = at;
        }
        if (dictionary.refinement && !dictionary.refinementTemplate) {
          var at = [];
          for (var i = 0; i < 2; i++) {
            at.push({
              x: readInt8(data, position),
              y: readInt8(data, position + 1)
            });
            position += 2;
          }
          dictionary.refinementAt = at;
        }
        dictionary.numberOfExportedSymbols = readUint32(data, position);
        position += 4;
        dictionary.numberOfNewSymbols = readUint32(data, position);
        position += 4;
        args = [dictionary, header.number, header.referredTo,
                data, position, end];
        break;
      case 6: // ImmediateTextRegion
        var textRegion = {};
        textRegion.info = readRegionSegmentInformation(data, position);
        position += RegionSegmentInformationFieldLength;
        var textRegionSegmentFlags = readUint16(data, position);
        position += 2;
        textRegion.huffman = !!(textRegionSegmentFlags & 1);
        textRegion.refinement = !!(textRegionSegmentFlags & 2);
        textRegion.stripSize = 1 << ((textRegionSegmentFlags >> 2) & 3);
        textRegion.referenceCorner = (textRegionSegmentFlags >> 4) & 3;
        textRegion.transposed = !!(textRegionSegmentFlags & 64);
        textRegion.combinationOperator = (textRegionSegmentFlags >> 7) & 3;
        textRegion.defaultPixelValue = (textRegionSegmentFlags >> 9) & 1;
        textRegion.dsOffset = (textRegionSegmentFlags >> 10) & 31;
        textRegion.refinementTemplate = (textRegionSegmentFlags >> 15) & 1;
        if (textRegion.huffman) {
          var textRegionHuffmanFlags = readUint16(data, position);
          position += 2;
          textRegion.huffmanFS = (textRegionHuffmanFlags) & 3;
          textRegion.huffmanDS = (textRegionHuffmanFlags >> 2) & 3;
          textRegion.huffmanDT = (textRegionHuffmanFlags >> 4) & 3;
          textRegion.huffmanRefinementDW = (textRegionHuffmanFlags >> 6) & 3;
          textRegion.huffmanRefinementDH = (textRegionHuffmanFlags >> 8) & 3;
          textRegion.huffmanRefinementDX = (textRegionHuffmanFlags >> 10) & 3;
          textRegion.huffmanRefinementDY = (textRegionHuffmanFlags >> 12) & 3;
          textRegion.huffmanRefinementSizeSelector =
            !!(textRegionHuffmanFlags & 14);
        }
        if (textRegion.refinement && !textRegion.refinementTemplate) {
          var at = [];
          for (var i = 0; i < 2; i++) {
            at.push({
              x: readInt8(data, position),
              y: readInt8(data, position + 1)
            });
            position += 2;
          }
          textRegion.refinementAt = at;
        }
        textRegion.numberOfSymbolInstances = readUint32(data, position);
        position += 4;
        // TODO 7.4.3.1.7 Symbol ID Huffman table decoding
        if (textRegion.huffman)
          throw 'huffman is not supported';
        args = [textRegion, header.referredTo, data, position, end];
        break;
      case 38: // ImmediateGenericRegion
        var genericRegion = {};
        genericRegion.info = readRegionSegmentInformation(data, position);
        position += RegionSegmentInformationFieldLength;
        var genericRegionSegmentFlags = data[position++];
        genericRegion.mmr = !!(genericRegionSegmentFlags & 1);
        genericRegion.template = (genericRegionSegmentFlags >> 1) & 3;
        genericRegion.prediction = !!(genericRegionSegmentFlags & 4);
        if (!genericRegion.mmr) {
          var atLength = genericRegion.template == 0 ? 4 : 1;
          var at = [];
          for (var i = 0; i < atLength; i++) {
            at.push({
              x: readInt8(data, position),
              y: readInt8(data, position + 1)
            });
            position += 2;
          }
          genericRegion.at = at;
        }
        args = [genericRegion, data, position, end];
        break;
      case 48: // PageInformation
        var pageInfo = {
          width: readUint32(data, position),
          height: readUint32(data, position + 4),
          resolutionX: readUint32(data, position + 8),
          resolutionY: readUint32(data, position + 12)
        };
        if (pageInfo.height == 0xFFFFFFFF)
          delete pageInfo.height;
        var pageSegmentFlags = data[position + 16];
        var pageStripingInformatiom = readUint16(data, position + 17);
        pageInfo.lossless = !!(pageSegmentFlags & 1);
        pageInfo.refinement = !!(pageSegmentFlags & 2);
        pageInfo.defaultPixelValue = (pageSegmentFlags >> 2) & 1;
        pageInfo.combinationOperator = (pageSegmentFlags >> 3) & 3;
        pageInfo.requiresBuffer = !!(pageSegmentFlags & 32);
        pageInfo.combinationOperatorOverride = !!(pageSegmentFlags & 64);
        args = [pageInfo];
        break;
      case 50: // EndOfStripe
        break;
      case 51: // EndOfFile
        break;
      default:
        throw 'Segment type is not implemented: ' +
              header.type + '/' + header.typeName;
    }
    if (header.typeName in visitor)
      visitor[header.typeName].apply(visitor, args);
  }