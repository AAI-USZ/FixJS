function(doc, oldval, newval) {
    var commonEnd, commonStart;
    if (oldval === newval) {
      return;
    }
    commonStart = 0;
    while (oldval.charAt(commonStart) === newval.charAt(commonStart)) {
      commonStart++;
    }
    commonEnd = 0;
    while (oldval.charAt(oldval.length - 1 - commonEnd) === newval.charAt(newval.length - 1 - commonEnd) && commonEnd + commonStart < oldval.length && commonEnd + commonStart < newval.length) {
      commonEnd++;
    }
    if (oldval.length !== commonStart + commonEnd) {
      doc.del(commonStart, oldval.length - commonStart - commonEnd);
    }
    if (newval.length !== commonStart + commonEnd) {
      return doc.insert(commonStart, newval.slice(commonStart, newval.length - commonEnd));
    }
  }