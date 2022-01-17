function lookBackwardsForBoilerplate(chunk) {
    var idxLineStart, idxLineEnd, line,
        idxRegionEnd = chunk.length,
        scanLinesLeft = MAX_BOILERPLATE_LINES,
        sawNonWhitespaceLine = false,
        lastContentLine = null,
        lastBoilerplateStart = null,
        sawProduct = false,
        insertAt = contentRep.length;

    function pushBoilerplate(contentType, merge) {
      var boilerChunk = chunk.substring(idxLineStart, idxRegionEnd);
      var idxChunkEnd = idxLineStart - 1;
      // We used to do a trimRight here, but that would eat spaces in addition
      // to newlines.  This was undesirable for both roundtripping purposes and
      // mainly because the "-- " signature marker has a significant space
      // character on the end there.
      while (chunk.charCodeAt(idxChunkEnd - 1) === CHARCODE_NEWLINE) {
        idxChunkEnd--;
      }
      var newChunk = chunk.substring(0, idxChunkEnd);
      var ate = countNewlinesInRegion(chunk, newChunk.length, idxLineStart - 1);
      chunk = newChunk;
      idxRegionEnd = chunk.length;

      if (!merge) {
        contentRep.splice(insertAt, 0,
                          ((ate&0xff) << 8) | contentType,
                          boilerChunk);
      }
      else {
        // nb: this merge does not properly reuse the previous existing 'ate'
        // value; if we start doing more complex merges, the hardcoded '\n'
        // below will need to be computed.
        contentRep[insertAt] = ((ate&0xff) << 8) | (contentRep[insertAt]&0xff);
        contentRep[insertAt + 1] = boilerChunk + '\n' +
                                     contentRep[insertAt + 1];
      }

      sawNonWhitespaceLine = false;
      scanLinesLeft = MAX_BOILERPLATE_LINES;
      lastContentLine = null;
      lastBoilerplateStart = idxLineStart;
    }

    for (idxLineStart = chunk.lastIndexOf('\n') + 1,
           idxLineEnd = chunk.length;
         idxLineEnd > 0 && scanLinesLeft;
         idxLineEnd = idxLineStart - 1,
           idxLineStart = chunk.lastIndexOf('\n', idxLineEnd - 1) + 1,
           scanLinesLeft--) {

      // (do not include the newline character)
      line = chunk.substring(idxLineStart, idxLineEnd);

      // - Skip whitespace lines.
      if (!line.length ||
          (line.length === 1 && line.charCodeAt(0) === CHARCODE_NBSP))
        continue;

      // - Explicit signature demarcation
      if (RE_SIGNATURE_LINE.test(line)) {
        // Check if this is just tagging something we decided was boilerplate in
        // a proper signature wrapper.  If so, then execute a boilerplate merge.
        if (idxLineEnd + 1 === lastBoilerplateStart) {
          pushBoilerplate(null, true);
        }
        else {
          pushBoilerplate(CT_SIGNATURE);
        }
        continue;
      }

      // - Section delimiter; try and classify what lives in this section
      if (RE_SECTION_DELIM.test(line)) {
        if (lastContentLine) {
          // - Look for a legal disclaimer sequentially following the line.
          if (RE_LEGAL_BOILER_START.test(lastContentLine)) {
            pushBoilerplate(CT_BOILERPLATE_DISCLAIMER);
            continue;
          }
          // - Look for mailing list
          if (RE_LIST_BOILER.test(lastContentLine)) {
            pushBoilerplate(CT_BOILERPLATE_LIST_INFO);
            continue;
          }
        }
        // The section was not boilerplate, so thus ends the reign of
        // boilerplate.  Bail.
        return chunk;
      }
      // - A line with content!
      if (!sawNonWhitespaceLine) {
        // - Product boilerplate (must be first/only non-whitespace line)
        if (!sawProduct && RE_PRODUCT_BOILER.test(line)) {
          pushBoilerplate(CT_BOILERPLATE_PRODUCT);
          sawProduct = true;
          continue;
        }
        sawNonWhitespaceLine = true;
      }
      lastContentLine = line;
    }

    return chunk;
  }