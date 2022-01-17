function pushContent(considerForBoilerplate, upToPoint, forcePostLine) {
    if (idxRegionStart === null) {
      if (atePreLines) {
        // decrement atePreLines if we are not the first chunk because then we get
        // an implicit/free newline.
        if (contentRep.length)
          atePreLines--;
        contentRep.push((atePreLines&0xff) << 8 | CT_AUTHORED_CONTENT);
        contentRep.push('');
      }
    }
    else {
      if (upToPoint === undefined)
        upToPoint = idxLineStart;

      var chunk = fullBodyText.substring(idxRegionStart,
                                         idxLastNonWhitespaceLineEnd);
      var atePostLines = forcePostLine ? 1 : 0;
      if (idxLastNonWhitespaceLineEnd + 1 !== upToPoint) {
        // We want to count the number of newlines after the newline that
        // belongs to the last non-meaningful-whitespace line up to the
        // effective point.  If we saw a lead-in, the effective point is
        // preceding the lead-in line's newline.  Otherwise it is the start point
        // of the current line.
        atePostLines += countNewlinesInRegion(fullBodyText,
                                              idxLastNonWhitespaceLineEnd + 1,
                                              upToPoint);
      }
      contentRep.push(((atePreLines&0xff) << 8) | ((atePostLines&0xff) << 16) |
                      CT_AUTHORED_CONTENT);
      var iChunk = contentRep.push(chunk) - 1;

      if (considerForBoilerplate)
        contentRep[iChunk] = lookBackwardsForBoilerplate(chunk);
    }

    atePreLines = 0;
    idxRegionStart = null;
    lastNonWhitespaceLine = null;
    idxLastNonWhitespaceLineEnd = null;
    idxPrevLastNonWhitespaceLineEnd = null;
  }