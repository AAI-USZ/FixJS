function pushBoilerplate(contentType) {
      var boilerChunk = chunk.substring(idxLineStart, idxRegionEnd);
      var newChunk = chunk.substring(0, idxLineStart - 1).trimRight();
      var ate = countNewlinesInRegion(chunk, newChunk.length, idxLineStart - 1);
      chunk = newChunk;
      idxRegionEnd = chunk.length;

      contentRep.splice(insertAt, 0,
                        ((ate&0xff) << 8) | contentType,
                        boilerChunk);

      sawNonWhitespaceLine = false;
      scanLinesLeft = MAX_BOILERPLATE_LINES;
      lastContentLine = null;
    }