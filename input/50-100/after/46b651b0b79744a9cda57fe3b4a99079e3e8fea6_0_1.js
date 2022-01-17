function pushContent(considerForBoilerplate) {
    if (idxRegionStart === null)
      return;
    var chunk = fullBodyText.substring(idxRegionStart,
                                       idxLastNonWhitespaceLineEnd);
    contentRep.push(CT_AUTHORED_CONTENT);
    var iChunk = contentRep.push(chunk) - 1;

    if (considerForBoilerplate)
      contentRep[iChunk] = lookBackwardsForBoilerplate(chunk);

    lastNonWhitespaceLine = null;
    idxLastNonWhitespaceLineEnd = null;
    idxPrevLastNonWhitespaceLineEnd = null;
  }